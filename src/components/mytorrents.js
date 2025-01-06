import Controller from '../interaction/controller'
import Reguest from '../utils/reguest'
import Card from '../interaction/card'
import Scroll from '../interaction/scroll'
import Background from '../interaction/background'
import Activity from '../interaction/activity'
import Arrays from '../utils/arrays'
import Empty from '../interaction/empty'
import Torserver from '../interaction/torserver'
import Torrent from '../interaction/torrent'
import Select from '../interaction/select'
import Utils from '../utils/math'
import Lang from '../utils/lang'
// PATCH START
import Storage from '../utils/storage'
import QBittorrent from '../interaction/qbittorrent'
// PATCH END

function component(object){
    let network = new Reguest()
    let scroll  = new Scroll({mask:true,over:true,step: 250,end_ratio:2})
    let items   = []
    let html    = $('<div></div>')
    // PATCH START
    let head = $("<div><div style='margin: 1em; width: fit-content;' class='simple-button selector'>Update</div></div>");
    // PATCH END
    let body    = $('<div class="category-full"></div>')
    let total_pages = 0
    let last
    let torrents = []
    
    
    this.create = function(){
        this.activity.loader(true)

        Torserver.my(this.build.bind(this),()=>{
            let empty = new Empty()

            html.append(empty.render())

            this.start = empty.start

            this.activity.loader(false)

            this.activity.toggle()
        })

        return this.render()
    }

    this.next = function(){
        if(object.page < 15 && object.page < total_pages){

            object.page++

            let offset = object.page - 1

            this.append(torrents.slice(20 * offset,20 * offset + 20), true)
        }
    }

    this.append = function(data, append){
        data.forEach(element => {
            element.title = element.title.replace('[LAMPA] ','')

            let item_data = Arrays.decodeJson(element.data,{})

            // PATCH START
            let card = new Card(element, {card_category: true, card_torrent: true})
            // PATCH END
                card.create()
                card.onFocus = (target, card_data)=>{
                    last = target

                    scroll.update(card.render(), true)

                    Background.change(item_data.movie ? Utils.cardImgBackground(item_data.movie) : element.poster)

                    if(scroll.isEnd()) this.next()
                }

                card.onEnter = (target, card_data)=>{
                    last = target
                    
                    this.start()
                    
                    Torrent.open(card_data.hash, item_data.lampa && item_data.movie ? item_data.movie : false)
                }

                card.onMenu = (target, card_data)=>{
                    // PATCH START
                    const view = target.querySelector(".card__view")
                    let hash;
                    if (view) {
                        hash = view.getAttribute("data-torrent-hash");
                    }
                    // PATCH END
                    let enabled = Controller.enabled().name
                    let menu    = []

                    if(item_data.movie){
                        menu.push({
                            title: Lang.translate('title_card')
                        })
                    }
                    // PATCH START
                    if (hash) {
                        const state = Storage.get('qbit_torrents', {})[hash];
                        if (state.state.includes('stopped')) {
                            menu.push({
                                title: Lang.translate('torrent_resume'),
                                resume: true
                            })
                        } else {
                            menu.push({
                                title: Lang.translate('torrent_pause'),
                                pause: true
                            })
                        }
                    }
                    // PATCH END

                    menu.push({
                        title: Lang.translate('torrent_remove_title'),
                        subtitle: Lang.translate('torrent_remove_descr'),
                        remove: true
                    })

                    Select.show({
                        title: Lang.translate('title_action'),
                        items: menu,
                        onBack: ()=>{
                            Controller.toggle(enabled)
                        },
                        onSelect: (a)=>{
                            if(a.remove){
                                Torserver.remove(card_data.hash)
                                
                                // PATCH START
                                QBittorrent.delete(card_data.hash)
                                    .catch(error => {
                                        console.error('Failed to delete torrent:', error);
                                    });
                                // PATCH END

                                Arrays.remove(items, card)
                                card.destroy()
                                last = false
                                Controller.toggle(enabled)
                            }
                            // PATCH START
                            else if(a.pause) {
                                QBittorrent.pause(card_data.hash)
                                    .catch(error => {
                                        console.error('Failed to stop torrent:', error);
                                    });
                                Controller.toggle(enabled)
                            }
                            else if(a.resume) {
                                QBittorrent.start(card_data.hash)
                                    .catch(error => {
                                        console.error('Failed to start torrent:', error);
                                    });
                                Controller.toggle(enabled)
                            }
                            // PATCH END
                            else{
                                Activity.push({
                                    url: item_data.movie.url,
                                    component: 'full',
                                    id: item_data.movie.id,
                                    method: item_data.movie.name ? 'tv' : 'movie',
                                    card: item_data.movie,
                                    source: item_data.movie.source || 'cub'
                                })
                            }
                        }
                    })
                }

                card.visible()

                body.append(card.render())

                if(append) Controller.collectionAppend(card.render())

            items.push(card)
        })
    }

    this.build = function(data){
        torrents = data

        total_pages = Math.ceil(torrents.length / 20)

        scroll.minus()

        this.append(torrents.slice(0,20))

        // PATCH START
        scroll.append(head)
        // PATCH END
        scroll.append(body)
        html.append(scroll.render())

        this.activity.loader(false)

        this.activity.toggle()
        // PATCH START
        var reload = head.find('.simple-button');
        reload.on('hover:enter', function () {
            QBittorrent.sync()
            Lampa.Activity.push({
                component: 'mytorrents',
                title: Lang.translate('title_mytorrents'),
            });
        });
        // PATCH END
    }


    this.start = function(){
        Controller.add('content',{
            toggle: ()=>{
                Controller.collectionSet(scroll.render())
                Controller.collectionFocus(last || false,scroll.render())
            },
            left: ()=>{
                if(Navigator.canmove('left')) Navigator.move('left')
                else Controller.toggle('menu')
            },
            right: ()=>{
                Navigator.move('right')
            },
            up: ()=>{
                if(Navigator.canmove('up')) Navigator.move('up')
                else Controller.toggle('head')
            },
            down: ()=>{
                if(Navigator.canmove('down')) Navigator.move('down')
            },
            back: ()=>{
                Activity.backward()
            }
        })

        Controller.toggle('content')
    }

    this.pause = function(){
        
    }

    this.stop = function(){
        
    }

    this.render = function(){
        return html
    }

    this.destroy = function(){
        network.clear()

        Arrays.destroy(items)

        scroll.destroy()

        html.remove()
        body.remove()

        network = null
        items   = null
        html    = null
        body    = null
    }
}

export default component