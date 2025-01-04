/**
 * @author dhvcc <alexey.artishevskiy@gmail.com>
 * @see {@link https://github.com/dhvcc/lampa}
 */

"use strict";

import QBitTorrent from "./qbittorrent";
import Plugin from "../utils/plugins";
import Storage from "../utils/storage";

// TODO ADD CONSOLE LOGGER FOR LAMPA STACK
// TODO QBitTorrent should handle login itself
//      First try with what we have and then login if unsuccessful. 3 Max retires with 1 second delay and then a Noty and log

// TYPES START
/**
 * @typedef {Object} PluginType
 * @property {string} url - URL of the plugin
 * @property {number} status - Status of the plugin (1 = enabled, 0 = disabled)
 * @property {string} name - Display name of the plugin
 * @property {string} [author] - Optional author name of the plugin
 */

// TYPES END

// TYPE PATCHES START
/**
 * @typedef {Object} PluginModule
 * @property {function(): void} init - Initialize plugins
 * @property {function(Function): void} load - Load all plugins
 * @property {function(PluginType): void} remove - Remove a plugin
 * @property {function(): string[]} loaded - Get list of loaded plugin URLs
 * @property {function(PluginType): void} add - Add a new plugin
 * @property {function(): PluginType[]} get - Get list of all plugins
 * @property {function(): void} save - Save plugins to storage
 * @property {function(PluginType): void} push - Push plugin to active list
 * Plugin utility for managing Lampa plugins
 */

/** @type {PluginModule} */
const Plugin = /** @type {any} */ (Plugin);
// TYPE PATCHES END

const _PROTOCOL = "http://";
const _ADDRESS = window.location.href
  .split(_PROTOCOL)[1]
  .split("/")[0]
  .split(":")[0];
const CORS_PROXY = `${_PROTOCOL}${_ADDRESS}:5667`;

const TS_URL = `${CORS_PROXY}/${_PROTOCOL}torrserver:5665`;
const QBIT_URL = `${CORS_PROXY}/${_PROTOCOL}qbittorrent:5666`;

/**
 * @type {PluginType[]}
 */
const DEFAULT_PLUGINS = [
  {
    url: "http://cub.red/plugin/trailers",
    status: 1,
    name: "Трейлеры",
    author: "@lampa",
  },
  {
    url: "https://nb557.github.io/plugins/rating.js",
    status: 1,
    name: "Рейтинг КиноПоиск и IMDB",
    author: "@t_anton",
  },
  {
    url: "https://cub.red/plugin/collections",
    status: 1,
    name: "Коллекции CUB",
    author: "@lampa",
  },
  {
    url: "http://cub.red/plugin/interface",
    status: 1,
    name: "Стильный интерфейс",
    author: "@lampa",
  },
  {
    url: "http://lampaplugins.github.io/store/o.js",
    status: 1,
    name: "Отзывы и рецензии",
    author: "@elenatv99",
  },
  {
    url: "http://lampaplugins.github.io/store/store.js",
    status: 1,
    name: "Пиратские плагины",
  },
  {
    url: "http://lampa.stream/modss",
    status: 1,
    name: "MODS",
    author: "@modss_group",
  },
  {
    url: "http://cub.red/plugin/tmdb-proxy",
    status: 1,
    name: "TMDB Proxy",
    author: "@lampa",
  },
  {
    url: "https://lampame.github.io/main/pubtorr.js",
    status: 1,
    name: "Публичные парсеры",
    author: "@lme_chat",
  },
  {
    url: "http://cub.red/plugin/etor",
    status: 1,
    name: 'Добавляет пункт "Парсер" в меню',
    author: "@lampa",
  },
  {
    url: "https://plugin.rootu.top/ts-preload.js",
    status: 1,
    name: "Предзагрузка ts",
    author: "@rootu",
  },
  {
    url: "https://lampame.github.io/main/shikimori.js",
    status: 1,
    name: "Shikimori catalog",
    author: "@lme_chat",
  },
];

const DEFAULT_SETTINGS = {
  parser_use: true,
  vpn_checked_ready: true,
  torrserver_url: TS_URL,
  jackett_key: "",
  jackett_url: "jacred.xyz",
  jackett_url2: "jacred_xyz",
  lme_url_two: "jacred_xyz",
  parse_in_search: true,
};

function init() {
  console.error("[LAMPA STACK] Init", _ADDRESS, CORS_PROXY, TS_URL, QBIT_URL);
  for (let key in DEFAULT_SETTINGS) {
    Storage.set(key, DEFAULT_SETTINGS[key]);
  }

  if (JSON.stringify(Storage.field("plugins")) === JSON.stringify([])) {
    console.error("NO PLUGINS INSTALLED. ADDING DEFAULT PLUGINS.");
    for (let plugin of DEFAULT_PLUGINS) {
      Plugin.add(plugin);
    }
  }

  // Initial authentication and data fetch
  QBitTorrent.login(
    () => {
      QBitTorrent.sync();
    },
    (error) => {
      Lampa.Noty.show(
        Lampa.Lang.translate("lampa_stack_failed_to_connect_to_qbittorrent")
      );
      console.error("Failed to authenticate with qBittorrent:", error);
    }
  );
}

export default {
  init,
  torrserver_url: TS_URL,
  qbittorrent_url: QBIT_URL,
};
