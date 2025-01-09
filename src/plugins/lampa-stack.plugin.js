(function() {
  'use strict';

  const EU_COUNTRIES = [
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'
  ];

  const DEFAULT_PLUGINS = [
    {
      url: "https://nb557.github.io/plugins/rating.js",
      status: 1,
      name: "Рейтинг КиноПоиск и IMDB",
      author: "@t_anton",
    },
    // ... other default plugins ...
  ];

  const DEFAULT_SETTINGS = {
    parser_use: true,
    vpn_checked_ready: true,
    torrserver_url: window.location.origin + '/torrserver',
    jackett_key: "",
    jackett_url: "jacred.xyz",
    jackett_url2: "jacred_xyz",
    lme_url_two: "jacred_xyz",
    parse_in_search: true,
  };

  async function checkLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const isEU = EU_COUNTRIES.includes(data.country);
      
      const currentPlugins = Lampa.Storage.get("plugins", []);
      const updatedPlugins = currentPlugins.map(plugin => {
        if (plugin.url === 'https://showypro.com/m.js') {
          return { ...plugin, status: Number(!isEU) };
        }
        if (plugin.url === 'http://showy.pro/m.js') {
          return { ...plugin, status: Number(isEU) };
        }
        return plugin;
      });
      
      const pluginsChanged = JSON.stringify(updatedPlugins) !== JSON.stringify(currentPlugins);
      if (pluginsChanged) {
        Lampa.Storage.set("plugins", updatedPlugins);
        console.info(`[LAMPA STACK] User location: ${data.country}, EU: ${isEU}. Updated Showy plugins accordingly.`);
        window.location.reload();
      } else {
        console.info(`[LAMPA STACK] User location: ${data.country}, EU: ${isEU}. No plugins updated.`);
      }
    } catch (error) {
      console.error('[LAMPA STACK] Failed to check location:', error);
    }
  }

  function initializeStack() {
    console.info("[LAMPA STACK] Init, setting default settings");
    
    // Set default settings
    for (let key in DEFAULT_SETTINGS) {
      Lampa.Storage.set(key, DEFAULT_SETTINGS[key]);
    }

    // Check location and update plugins
    checkLocation();

    // Handle Showy token
    if (Lampa.Storage.get("showy_token", "")) {
      console.warn("[LAMPA STACK] Showy PRO available. Disabling Showy Free plugin");
      const currentPlugins = Lampa.Storage.get("plugins", []);
      const updatedPlugins = currentPlugins.map(plugin => {
        if (plugin.url === 'http://showy.online/m.js') {
          return {...plugin, status: 0};
        }
        return plugin;
      });
      Lampa.Storage.set("plugins", updatedPlugins);
    }

    // Initialize default plugins if none exist
    if (JSON.stringify(Lampa.Storage.get("plugins", [])) === JSON.stringify([])) {
      console.warn("[LAMPA STACK] No plugins installed. Adding default plugins.");
      for (let plugin of DEFAULT_PLUGINS) {
        Lampa.Plugin.add(plugin);
      }
    } else {
      console.info("[LAMPA STACK] Plugins already installed. Skipping defaults");
    }

    // Disable Christmas button
    Lampa.Template.add('DisableChristmasButton', "<style> .christmas__button{display: none;} </style>");
    $('body').append(Lampa.Template.get('DisableChristmasButton', {}, true));
  }

  // Plugin manifest
  const manifest = {
    name: 'Lampa Stack',
    version: '1.0.0',
    description: 'Plugin for managing Lampa stack functionality',
    author: 'dhvcc',
    type: 'plugin',
    init: initializeStack
  };

  // Register plugin
  window.lampa_stack_plugin = true;
  Lampa.Plugin.register(manifest);
})(); 