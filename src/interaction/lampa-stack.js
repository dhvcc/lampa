/**
 * @author dhvcc <alexey.artishevskiy@gmail.com>
 * @see {@link https://github.com/dhvcc/lampa/tree/custom-patches}
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
// TYPE PATCHES END

const _PROTOCOL = "http://";
const TS_URL = `${window.location.origin}/torrserver`;
const QBIT_URL = `${window.location.origin}/qbittorrent`;

/**
 * @type {PluginType[]}
 */
const DEFAULT_PLUGINS = [
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
  {
    url: "http://showy.online/m.js",
    status: 1,
    name: "Showy",
    author: "Showy",
  },
  {
    url: "http://skaz.tv/tv.js",
    status: 1,
    name: "Телевидение by Skaz ",
    author: "@helpiptv",
  },
];

const DEFAULT_MENU_ITEMS_SHOW = [
  ["menu_main", true],
  ["menu_feed", false],
  ["settings_input_links", true],
  ["title_subscribes", true],
  ["menu_history", true],
  ["menu_torrents", true],
  ["menu_timeline", true],
  ["menu_movies", true],
  ["title_persons", false][("menu_tv", true)],
  ["menu_catalog", true],
  ["menu_relises", false],
  ["menu_collections", true],
  ["menu_filter", true],
  ["menu_anime", true],
  ["Shikimori", true],
  ["ТВ by skaz", false][("TV by skaz 2.0", true)],
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
  console.info("[LAMPA STACK] Init, setting default settings");
  for (let key in DEFAULT_SETTINGS) {
    Storage.set(key, DEFAULT_SETTINGS[key]);
  }

  if (JSON.stringify(Storage.get("plugins", [])) === JSON.stringify([])) {
    console.warn("[LAMPA STACK] No plugins installed. Adding default plugins.");
    for (let plugin of DEFAULT_PLUGINS) {
      Plugin.add(plugin);
    }
  } else {
    console.info("[LAMPA STACK] Plugins already installed. Skipping defaults");
  }

  if (!menu_hide_value || menu_hide_value === JSON.stringify([])) {
    console.warn("[LAMPA STACK] No menu items hidden. Setting default menu items.");

    const DEFAULT_MENU_SORT = [
      Lampa.Lang.translate("menu_main"),
      Lampa.Lang.translate("menu_feed"),
      Lampa.Lang.translate("settings_input_links"),
      Lampa.Lang.translate("title_subscribes"),
      Lampa.Lang.translate("menu_history"),
      Lampa.Lang.translate("menu_torrents"),
      Lampa.Lang.translate("menu_timeline"),
      Lampa.Lang.translate("menu_movies"),
      Lampa.Lang.translate("title_persons"),
      Lampa.Lang.translate("menu_tv"),
      Lampa.Lang.translate("menu_catalog"),
      Lampa.Lang.translate("menu_relises"),
      Lampa.Lang.translate("menu_collections"),
      Lampa.Lang.translate("menu_filter"),
      Lampa.Lang.translate("menu_anime"),
      Lampa.Lang.translate("Shikimori"),
      Lampa.Lang.translate("ТВ by skaz"),
      Lampa.Lang.translate("TV by skaz 2.0"),
    ];

    const DEFAULT_MENU_HIDE = [
      Lampa.Lang.translate("menu_feed"),
      Lampa.Lang.translate("title_persons"),
      Lampa.Lang.translate("menu_relises"),
      Lampa.Lang.translate("ТВ by skaz"),
    ];

    Storage.set("menu_hide", DEFAULT_MENU_HIDE);
    Storage.set("menu_sort", DEFAULT_MENU_SORT);
  }

  // Disable Christmas button
  Lampa.Template.add('DisableChristmasButton', "<style> .christmas__button{display: none;} </style>");
  $('body').append(Lampa.Template.get('DisableChristmasButton', {}, true));


  // Initial authentication and data fetch
  QBitTorrent.login(
    () => {
      QBitTorrent.sync();
    },
    (error) => {
      Lampa.Noty.show(
        Lampa.Lang.translate("lampa_stack_failed_to_connect_to_qbittorrent")
      );
      console.error("[LAMPA STACK] Failed to authenticate with qBittorrent:", error);
    }
  );
}

export default {
  init,
  torrserver_url: TS_URL,
  qbittorrent_url: QBIT_URL,
};
