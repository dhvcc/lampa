let html = `<div class="head">
    <div class="head__body">
        <div class="head__logo-icon">
            <img src="./img/logo-icon.svg" />

            <div class="head__logo-cap">
                <svg width="59" height="46" viewBox="0 0 59 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.5361 36.4721V32.6155C17.1449 32.6154 13.808 33.4671 10.8317 35.0924L8.51766 33.1592L9.78554 30.4412C11.7856 26.1578 12.8223 21.488 12.8227 16.7606C12.8228 13.3305 14.1854 10.0409 16.6109 7.61542C20.9763 3.25022 26.8969 0.797852 33.0703 0.79776C39.2438 0.797852 45.1643 3.25022 49.5297 7.61542L50.4254 8.51114V15.2603L29.2136 36.4721H20.5361Z" fill="#C52C37"/>
                    <path d="M8.51958 33.1592L9.78747 30.4412C11.7869 26.1576 12.8229 21.4878 12.8227 16.7605C12.8227 13.3304 14.1854 10.0408 16.6109 7.61536C19.2135 5.01596 22.3951 3.07043 25.8949 1.93831C26.8241 1.82289 27.7595 1.76396 28.6959 1.76187C29.1627 1.76486 29.6288 1.80256 30.09 1.87468C38.9951 3.21295 42.5462 14.2113 36.4536 20.8467C31.7484 25.98 25.9354 31.6512 20.5361 35.1116V32.6154C17.1449 32.6153 13.808 33.4671 10.8317 35.0924L8.51958 33.1592Z" fill="#ED4241"/>
                    <path d="M20.5361 36.4721L22.4644 45.1496C30.8254 43.7082 38.6036 39.9177 44.8909 34.2208C51.1781 28.524 55.7147 21.1559 57.971 12.9771L58.1388 12.3678L50.4254 8.51108L49.4564 10.3613C43.2372 22.2342 32.9806 31.4943 20.5361 36.4721Z" fill="#C1CFE8"/>
                    <path d="M19.5719 32.6154H21.5003V30.0363C21.4991 26.1007 22.1334 22.1909 23.3785 18.4575L21.5465 17.8481C20.2363 21.778 19.5695 25.8937 19.5719 30.0363V32.6154Z" fill="#C52C37"/>
                    <path d="M6.07349 44.1855C2.8785 44.1855 0.28845 41.5954 0.28845 38.4005C0.28845 35.2055 2.8785 32.6154 6.07349 32.6154C9.26847 32.6154 11.8585 35.2055 11.8585 38.4005C11.8585 41.5954 9.26847 44.1855 6.07349 44.1855Z" fill="#C1CFE8"/>
                    <path d="M50.4254 8.51108L57.9392 12.2714C55.6184 18.7688 51.8258 24.6411 46.8579 29.429C41.8901 34.2168 35.8819 37.7903 29.3033 39.8698C28.5677 40.1008 27.7921 40.1764 27.0257 40.0919C26.2593 40.0073 25.5189 39.7644 24.8513 39.3786C24.1837 38.9928 23.6036 38.4725 23.1478 37.8506C22.6919 37.2288 22.3702 36.519 22.2031 35.7663C33.9115 30.6424 43.5242 21.6816 49.4564 10.3613L50.4254 8.51108ZM6.07347 32.6154C7.13506 32.6157 8.17586 32.9097 9.08073 33.4648C9.75727 34.5711 10.0419 35.8729 9.88893 37.1606C9.73591 38.4483 9.15411 39.6471 8.23715 40.5641C7.32018 41.4811 6.12139 42.0629 4.83367 42.2159C3.54594 42.3689 2.24419 42.0842 1.13787 41.4077C0.601807 40.5314 0.309057 39.5281 0.289791 38.5011C0.270524 37.474 0.525435 36.4604 1.02826 35.5647C1.53109 34.669 2.26364 33.9235 3.15045 33.4051C4.03726 32.8867 5.04626 32.6141 6.07347 32.6154Z" fill="#D7E0EF"/>
                </svg>
            </div>
        </div>

        <div class="head__logo-icon head__logo-halloween hide">
            <div class="head__logo-halloween-fire"></div>
            <div class="head__logo-halloween-svg">
                <svg width="512" height="494" viewBox="0 0 512 494" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M247.135 95.8686C247.135 95.8686 253.636 43.2644 279.052 22.5773C304.467 1.89026 322.199 0.117081 322.199 0.117081L350.57 30.2611C350.57 30.2611 277.279 52.7213 272.55 120.693C268.413 189.256 247.135 95.8686 247.135 95.8686Z" fill="#68AA00"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M501.29 205.214C523.159 272.004 509.565 351.797 464.644 413.267C447.504 437.5 426.817 456.414 404.947 468.826C383.078 481.83 360.027 488.331 336.976 488.331C325.154 488.331 312.742 486.558 300.921 482.421L296.784 481.239L293.237 483.603C271.959 497.788 242.997 497.197 221.719 482.421L218.173 480.057L214.035 481.239C201.032 485.967 188.029 488.331 174.435 488.331C128.332 488.331 81.6383 460.552 46.7659 412.676C2.43651 351.206 -11.7489 271.413 10.1203 204.623C37.9 123.057 99.9612 105.325 147.246 105.325C180.316 105.325 207.326 113.717 213.37 115.595C214.132 115.831 214.56 115.965 214.626 115.965L218.764 117.147L222.31 114.782C243.588 100.006 272.55 99.4149 293.828 113.6L297.375 115.965L300.921 114.782C310.378 111.827 334.611 105.325 364.164 105.325C412.04 105.325 474.101 123.057 501.29 205.214ZM117.102 193.393L225.266 238.905C224.674 239.496 153.747 310.423 117.102 193.393ZM360.027 361.254L380.123 382.532L446.321 281.461L380.123 323.426L360.027 302.148L294.419 345.295L256.001 313.378L217.582 345.295L151.974 302.148L131.287 323.426L65.6797 281.461L131.287 382.532L151.974 361.254L217.582 404.401L256.001 372.484L294.419 404.401L360.027 361.254ZM401.401 193.393L293.237 238.905C293.237 239.496 364.755 310.423 401.401 193.393Z" fill="#F27503"/>
                    <path d="M297.375 481.83L301.512 483.012C313.333 486.558 325.154 488.922 337.567 488.922C360.618 488.922 384.26 481.83 405.538 469.418C427.407 456.414 447.503 437.5 465.235 413.858C509.565 352.388 523.75 272.595 501.881 205.805C474.101 123.057 412.04 105.326 364.755 105.326C335.202 105.326 310.378 111.827 301.512 114.782L297.375 115.965C297.375 115.965 367.119 140.789 401.401 193.393C401.401 193.393 401.401 193.393 401.401 193.393C416.236 216.082 428.736 251.977 430.192 291.686L446.321 281.461L430.227 306.034C428.159 370.406 395.544 441.591 297.375 481.83Z" fill="#D35C02"/>
                </svg>
            </div>
        </div>

        <div class="head__menu-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" x="0" y="0" viewBox="0 0 32 32" xml:space="preserve" style="width: 2.1em; height: 2.1em;">
                <path d="M29 8H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4zM29 28H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4zM29 18H3a2 2 0 0 1 0-4h26a2 2 0 0 1 0 4z" fill="currentColor"></path>
            </svg>
        </div>

        <div class="head__title"></div>
        
        <div class="head__actions">
            <div class="head__action head__settings selector open--search">
                <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9.9964" cy="9.63489" r="8.43556" stroke="currentColor" stroke-width="2.4"/>
                    <path d="M20.7768 20.4334L18.2135 17.8701" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
                </svg>
            </div>

            <div class="head__action head__settings selector open--broadcast">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.04272 7.22978V6.76392C1.04272 4.00249 3.2813 1.76392 6.04272 1.76392H17.7877C20.5491 1.76392 22.7877 4.00249 22.7877 6.76392V17.2999C22.7877 20.0613 20.5491 22.2999 17.7877 22.2999H15.8387" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
                    <circle cx="6.69829" cy="16.6443" r="5.65556" fill="currentColor"/>
                </svg>
            </div>

            <div class="head__action selector open--settings">
                <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.35883 18.1883L1.63573 17.4976L2.35883 18.1883L3.00241 17.5146C3.8439 16.6337 4.15314 15.4711 4.15314 14.4013C4.15314 13.3314 3.8439 12.1688 3.00241 11.2879L2.27931 11.9786L3.00241 11.2879L2.35885 10.6142C1.74912 9.9759 1.62995 9.01336 2.0656 8.24564L2.66116 7.19613C3.10765 6.40931 4.02672 6.02019 4.90245 6.24719L5.69281 6.45206C6.87839 6.75939 8.05557 6.45293 8.98901 5.90194C9.8943 5.36758 10.7201 4.51559 11.04 3.36732L11.2919 2.46324C11.5328 1.59833 12.3206 1 13.2185 1H14.3282C15.225 1 16.0121 1.59689 16.2541 2.46037L16.5077 3.36561C16.8298 4.51517 17.6582 5.36897 18.5629 5.90557C19.498 6.4602 20.6725 6.75924 21.8534 6.45313L22.6478 6.2472C23.5236 6.02019 24.4426 6.40932 24.8891 7.19615L25.4834 8.24336C25.9194 9.0118 25.7996 9.97532 25.1885 10.6135L24.5426 11.2882C23.7 12.1684 23.39 13.3312 23.39 14.4013C23.39 15.4711 23.6992 16.6337 24.5407 17.5146L25.1842 18.1883C25.794 18.8266 25.9131 19.7891 25.4775 20.5569L24.8819 21.6064C24.4355 22.3932 23.5164 22.7823 22.6406 22.5553L21.8503 22.3505C20.6647 22.0431 19.4876 22.3496 18.5541 22.9006C17.6488 23.4349 16.8231 24.2869 16.5031 25.4352L16.2513 26.3393C16.0103 27.2042 15.2225 27.8025 14.3246 27.8025H13.2184C12.3206 27.8025 11.5328 27.2042 11.2918 26.3393L11.0413 25.4402C10.7206 24.2889 9.89187 23.4336 8.98627 22.8963C8.05183 22.342 6.87822 22.0432 5.69813 22.3491L4.90241 22.5553C4.02667 22.7823 3.10759 22.3932 2.66111 21.6064L2.06558 20.5569C1.62993 19.7892 1.74911 18.8266 2.35883 18.1883Z" stroke="currentColor" stroke-width="2.4"/>
                    <circle cx="13.7751" cy="14.4013" r="4.1675" stroke="currentColor" stroke-width="2.4"/>
                </svg>
            </div>

            <div class="head__action selector open--premium icon--blink" data-blink-interval="45">
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.6162 7.10981L15.8464 7.55198L16.3381 7.63428L22.2841 8.62965C22.8678 8.72736 23.0999 9.44167 22.6851 9.86381L18.4598 14.1641L18.1104 14.5196L18.184 15.0127L19.0748 20.9752C19.1622 21.5606 18.5546 22.002 18.025 21.738L12.6295 19.0483L12.1833 18.8259L11.7372 19.0483L6.34171 21.738C5.81206 22.002 5.20443 21.5606 5.29187 20.9752L6.18264 15.0127L6.25629 14.5196L5.9069 14.1641L1.68155 9.86381C1.26677 9.44167 1.49886 8.72736 2.08255 8.62965L8.02855 7.63428L8.52022 7.55198L8.75043 7.10981L11.5345 1.76241C11.8078 1.23748 12.5589 1.23748 12.8322 1.76241L15.6162 7.10981Z" stroke="currentColor" stroke-width="2.2"/>
                </svg>
            </div>

            <div class="head__action selector open--feed">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 0L11.4308 6.56918L18 9L11.4308 11.4308L9 18L6.56918 11.4308L0 9L6.56918 6.56918L9 0Z" fill="currentColor"/>
                </svg>
            </div>

            <div class="head__action selector open--notice notice--icon">
                <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.01892 24C6.27423 27.3562 9.07836 30 12.5 30C15.9216 30 18.7257 27.3562 18.981 24H15.9645C15.7219 25.6961 14.2632 27 12.5 27C10.7367 27 9.27804 25.6961 9.03542 24H6.01892Z" fill="currentColor"/>
                <path d="M3.81972 14.5957V10.2679C3.81972 5.41336 7.7181 1.5 12.5 1.5C17.2819 1.5 21.1803 5.41336 21.1803 10.2679V14.5957C21.1803 15.8462 21.5399 17.0709 22.2168 18.1213L23.0727 19.4494C24.2077 21.2106 22.9392 23.5 20.9098 23.5H4.09021C2.06084 23.5 0.792282 21.2106 1.9273 19.4494L2.78317 18.1213C3.46012 17.0709 3.81972 15.8462 3.81972 14.5957Z" stroke="currentColor" stroke-width="2.6"/>
                </svg>
            </div>

            <div class="head__action hide selector open--profile">
                <img />
            </div>

            <div class="head__action selector hide full-screen">
                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.51904 7.75323V5C1.51904 2.79086 3.3099 1 5.51904 1H8.46433" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>
                    <path d="M1.51904 14.7305V17.4837C1.51904 19.6928 3.3099 21.4837 5.51904 21.4837H8.46433" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>
                    <path d="M23.2815 7.75323V5C23.2815 2.79086 21.4906 1 19.2815 1H16.3362" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>
                    <path d="M23.2815 14.7305V17.4837C23.2815 19.6928 21.4906 21.4837 19.2815 21.4837H16.3362" stroke="currentColor" stroke-width="2.7" stroke-linecap="round"/>
                </svg>
            </div>
        </div>

        <!-- PATCH START -->
        <div id="MRELOAD-custom" class="head__action selector m-reload-screen-custom"><svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.4800000000000001"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z" fill="currentColor"></path></g></svg></div>
        <!-- PATCH END -->

        <div class="head__split"></div>

        <div class="head__time">
            <div class="head__time-now time--clock"></div>
            <div>
                <div class="head__time-date time--full"></div>
                <div class="head__time-week time--week"></div>
            </div>
        </div>
    </div>
</div>`

export default html