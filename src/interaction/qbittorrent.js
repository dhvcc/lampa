/**
 * Utility module for interacting with qBittorrent WebUI API
 */

"use strict";

import Request from "../utils/reguest";
import { createFormData, formatETA, formatStatus } from "../utils/qbittorrent";
import Storage from "../utils/storage";
import LampaStack from "./lampa-stack";

let network = new Request();

function clear() {
  network.clear();
}

export default {
  /**
   * Authenticate with qBittorrent
   * @param {Function} success - Success callback
   * @param {Function} fail - Error callback
   */
  login(success, fail) {
    clear();
    return network.silent(
      LampaStack.qbittorrent_url + "/api/v2/auth/login",
      (result) => {
        if (success) success(result);
      },
      (error) => {
        // Somehow it errors but it's all good
        if (error.status === 200) {
          success(error);
          return;
        }

        console.error("Authentication error:", error);
        if (fail) fail(error);
      },
      "username=admin&password=admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  },

  /**
   * Start one or multiple torrents
   * @param {string|string[]} hashes - Torrent hash(es)
   */
  start(hashes) {
    clear();
    return network.silent(
      LampaStack.qbittorrent_url + "/api/v2/torrents/resume",
      () => {},
      (error) => {
        console.error("Failed to start torrent:", error);
      },
      createFormData(hashes),
      {
        dataType: "text",
      }
    );
  },

  /**
   * Pause one or multiple torrents
   * @param {string|string[]} hashes - Torrent hash(es)
   */
  pause(hashes) {
    clear();
    return network.silent(
      LampaStack.qbittorrent_url + "/api/v2/torrents/pause",
      () => {},
      (error) => {
        console.error("Failed to pause torrent:", error);
      },
      createFormData(hashes),
      {
        dataType: "text",
      }
    );
  },

  /**
   * Delete torrents and optionally their files
   * @param {string|string[]} hashes - Torrent hash(es)
   * @param {boolean} deleteFiles - Whether to delete files as well
   */
  delete(hashes, deleteFiles = true) {
    clear();
    return network.silent(
      LampaStack.qbittorrent_url + "/api/v2/torrents/delete",
      () => {},
      (error) => {
        console.error("Failed to delete torrent:", error);
      },
      createFormData(hashes, { deleteFiles }),
      {
        dataType: "text",
      }
    );
  },

  /**
   * Get torrent list with detailed status and store in Storage
   * @returns {void}
   */
  sync(success, fail) {
    clear();
    network
      .silent(
        LampaStack.qbittorrent_url + "/api/v2/sync/maindata",
        (data) => {
          if (!data.torrents) {
            if (fail) fail("No torrent data received");
            return;
          }

          const processed = {};

          Object.entries(data.torrents).forEach(([hash, torrent]) => {
            const progress = Math.round(torrent.progress * 100);
            const dlSpeed = (torrent.dlspeed / (1024 * 1024)).toFixed(2);

            processed[hash] = {
              time: torrent.added_on * 1000,
              status: formatStatus(torrent.state),
              state: torrent.state,
              progress: progress,
              size: torrent.size,
            };

            if (torrent.state === "downloading") {
              processed[hash].dl = dlSpeed;
              processed[hash].eta = formatETA(torrent.eta);
            }
          });
          Storage.set("qbit_torrents", processed);

          if (success) success(processed);
        },
        (error) => {
          console.error("Failed to get torrent list:", error);
          if (fail) fail(error);
        },
        undefined,
        {
          withCredentials: true,
        }
      )
  },

  clear,
  formatETA,
  formatStatus,
};
