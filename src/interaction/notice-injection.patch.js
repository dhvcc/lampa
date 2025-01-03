import Plugin from '../utils/plugins';
import Storage from '../utils/storage';

const _PROTOCOL = "http://";
const _ADDRESS = window.location.href.split(_PROTOCOL)[1].split("/")[0].split(":")[0];

const CORS_PROXY = `${_PROTOCOL}${_ADDRESS}:5667`;
const TS_URL = `${CORS_PROXY}/${_PROTOCOL}torrserver:5665`;
const QBIT_URL = `${_PROTOCOL}${_ADDRESS}:5666`;

const FETCH_TORRENT_DATA_INTERVAL = 10000; // 5 seconds

// Function to authenticate and get token
async function authenticateQBit() {
    try {
        const response = await fetch(`${QBIT_URL}/api/v2/auth/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'username=admin&password=admin'
        });

        if (!response.ok) throw new Error('Authentication failed');
        return true;
    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }
}

function formatETA(seconds) {
    if (seconds < 0 || seconds === 8640000) return '∞';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    let result = '';

    if (hours > 0) {
        result += hours + 'h';
        if (minutes > 0) result += minutes + 'm';
    } else if (minutes > 0) {
        result += minutes + 'm';
        if (secs > 0) result += secs + 's';
    } else {
        result = secs + 's';
    }

    return result;
}

function formatStatus(status) {
    if (status === "stalledUP") return "🌱 Seeding";
    if (status === "stoppedUP") return "✅ Done";
    if (status === "missingFiles") return "⚠️ Missing Files";
    if (status === "stoppedDL") return "⏹️ Stopped";
    if (status === "downloading") return "📥 Downloading";
    if (status === "stalledDL") return "🕔 Stalled";
    if (status === "checkingDL") return "🔍 Checking Disk Files";
    if (status === "uploading") return "📤 Uploading";
    if (status === "metaDL") return "📝 Metadata";
    return status
}

// Function to fetch torrent data
async function fetchTorrentData() {
    try {
        const response = await fetch(`${QBIT_URL}/api/v2/sync/maindata`, {
            credentials: 'include'
        });

        if (response.status === 403) {
            console.error(response);
            return [];
        }

        const data = await response.json();

        Object.entries(data.torrents).forEach(([hash, torrent]) => {
            const progress = Math.round(torrent.progress * 100);
            const dlSpeed = (torrent.dlspeed / (1024 * 1024)).toFixed(2);

            const data = {
                // id: hash,
                // from: 'torrserver',
                // title: torrent.name,
                // text: '',
                // text: `Status: ${torrent.state}\nProgress: ${progress}%\nDL: ${dlSpeed} MB/s\nUL: ${upSpeed} MB/s`,
                // time: Date.now(),
                time: torrent.added_on * 1000,
                // labels: [`Status: ${formatStatus(torrent.state)}`, `Progress: ${progress}%`],
                status: formatStatus(torrent.state),
                progress: progress,
                size: torrent.size,
                // Hack to preserve poster
                // poster: torrent.tags,
            }
            if (torrent.state === "downloading") {
                // data.labels.push(`DL: ${dlSpeed} MB/s`);
                // data.labels.push(`ETA: ${formatETA(torrent.eta)}`);
                data.dl = dlSpeed;
                data.eta = formatETA(torrent.eta);
            }

            // const resolve = (v) => console.error('good', v)
            // const reject = (v) => console.error('bad', v)

            // Lampa.Notice.pushNotice('torrserver', data);
            const prevState = Storage.get('qbit_torrents', {});
            prevState[hash] = data;
            Storage.set('qbit_torrents', prevState);
        });
    } catch (error) {
        console.error('Failed to fetch torrent data:', error);
    }
}

function init() {
    setTimeout(() => {
        // var mynotice = new Lampa.NoticeClassLampa({ name: 'TorrServer', db_name: 'notice_torr' });
        // Lampa.Notice.addClass('torrserver', mynotice);

        Lampa.Storage.set('parser_use', true);
        Lampa.Storage.set('vpn_checked_ready', true);
        Lampa.Storage.set('torrserver_url', TS_URL);
        Lampa.Storage.set('jackett_url2', 'jacred_xyz');
        Lampa.Storage.set('lme_url_two', 'jacred_xyz');
        Lampa.Storage.set('parse_in_search', true);

        if (JSON.stringify(Lampa.Storage.field('plugins')) === JSON.stringify([])) {
            console.error("NO PLUGINS INSTALLED. ADDING DEFAULT PLUGINS.")
            Plugin.add({
                url: 'http://cub.red/plugin/trailers',
                status: 1,
                name: 'Трейлеры',
                author: '@lampa'
            });
            Plugin.add({
                "url": "https://nb557.github.io/plugins/rating.js",
                "status": 1,
                "name": "Рейтинг КиноПоиск и IMDB",
                "author": "@t_anton"
            });
            Plugin.add({
                "url": "https://cub.red/plugin/collections",
                "status": 1,
                "name": "Коллекции CUB",
                "author": "@lampa"
            });
            Plugin.add({
                "url": "http://cub.red/plugin/interface",
                "status": 1,
                "name": "Стильный интерфейс",
                "author": "@lampa"
            });
            Plugin.add({
                "url": "http://lampaplugins.github.io/store/o.js",
                "status": 1,
                "name": "Отзывы и рецензии",
                "author": "@elenatv99"
            })
            Plugin.add({
                "url": "http://lampaplugins.github.io/store/store.js",
                "status": 1,
                "name": "Pirate Store",
            })
            Plugin.add({
                "url": "http://lampa.stream/modss",
                "status": 1,
                "name": "MODS",
                "author": "@modss_group",
            });
            Plugin.add({
                "url": "http://cub.red/plugin/tmdb-proxy",
                "status": 1,
                "name": "TMDB Proxy",
                "author": "@lampa"
            });
            Plugin.add({
                "url": "https://lampame.github.io/main/pubtorr.js",
                "status": 1,
                "name": "Публичные парсеры",
                "author": "@lme_chat"
            });
            Plugin.add({
                "url": "http://cub.red/plugin/etor",
                "status": 1,
                "name": "Добавляет пункт \"Парсер\" в меню",
                "author": "@lampa"
            });
            Plugin.add({
                "url": "https://plugin.rootu.top/ts-preload.js",
                "status": 1,
                "name": "Предзагрузка ts",
                "author": "@rootu"
            });
        }
    }, 500)
    setTimeout(() => {
        setInterval(fetchTorrentData, FETCH_TORRENT_DATA_INTERVAL);

        // Initial fetch with authentication
        authenticateQBit().then(() => fetchTorrentData());
    }, 1000);
}

export default {
    init,
}