"use strict";

/**
 * Create FormData object for qBittorrent API requests
 * @param {string|string[]} hashes - Single torrent hash or array of hashes
 * @param {Object} additionalParams - Additional parameters to include in form data
 * @returns {FormData} FormData object ready for API request
 */
export function createFormData(hashes, additionalParams = {}) {
  const formData = new FormData();
  formData.append("hashes", Array.isArray(hashes) ? hashes.join("|") : hashes);

  Object.entries(additionalParams).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
}

/**
 * Format seconds into human readable time string
 * @param {number} seconds - Time in seconds
 * @returns {string} Formatted time string
 */
export function formatETA(seconds) {
  if (seconds < 0 || seconds === 8640000) return "∞";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  let result = "";

  if (hours > 0) {
    result += hours + "h";
    if (minutes > 0) result += minutes + "m";
  } else if (minutes > 0) {
    result += minutes + "m";
    if (secs > 0) result += secs + "s";
  } else {
    result = secs + "s";
  }

  return result;
}

/**
 * Format torrent status into human readable string with emoji
 * @param {string} status - Raw status from qBittorrent
 * @returns {string} Formatted status string with emoji
 */
export function formatStatus(status) {
  if (status === "stalledUP") return "🌱 Seeding";
  if (status === "stoppedUP") return "✅ Done";
  if (status === "missingFiles") return "⚠️ Missing Files";
  if (status === "stoppedDL") return "⏹️ Stopped";
  if (status === "downloading") return "📥 Downloading";
  if (status === "stalledDL") return "🕔 Stalled";
  if (status === "checkingDL") return "🔍 Checking Disk Files";
  if (status === "uploading") return "📤 Uploading";
  if (status === "metaDL") return "📝 Metadata";
  return status;
}

export default {
  createFormData,
  formatETA,
  formatStatus,
};
