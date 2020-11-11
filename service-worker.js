importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox){
    workbox.precaching.precacheAndRoute([
        { url: '/', revision: '3' },
        { url: '/nav.html', revision: '3' },
        { url: '/index.html', revision: '3' },
        { url: '/detail_info.html', revision: '3' },
        { url: '/manifest.json', revision: '3' },
        { url: '../node_js/push.js', revision: '3' },
        { url: '/pages/favorite.html', revision: '3' },
        { url: '/pages/information.html', revision: '3' },
        { url: '/pages/klasemen.html', revision: '3' },
        { url: '/css/materialize.min.css', revision: '3' },
        { url: '/js/materialize.min.js', revision: '3' },
        { url: '/js/api.js', revision: '3' },
        { url: '/js/db.js', revision: '3' },
        { url: '/js/idb.js', revision: '3' },
        { url: '/js/nav.js', revision: '3' },
        { url: '/js/register_sw.js', revision: '3' },
        { url: '/js/detail_info.js', revision: '3' },
        { url: '/icon/icon-48new.png', revision: '3' },
        { url: '/icon/icon-96new.png', revision: '3' },
        { url: '/icon/icon-192new.png', revision: '3' },
        { url: '/icon/icon-512new.png', revision: '3' },
        { url: '/icon/maskable_icon_new.png', revision: '3' },
    ], {
    ignoreUrlParametersMatching: [/.*/]
  });

    workbox.routing.registerRoute(
      new RegExp('https://api.football-data.org/v2/'),
      workbox.strategies.staleWhileRevalidate()
    );

    workbox.routing.registerRoute(
      /.*(?:googleapis|gstatic)\.com/,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'source-google-font',
      })
    );

    workbox.routing.registerRoute(
      new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
          cacheName: 'pages',
      })
    );

    workbox.routing.registerRoute(
      /\.(?:js|css)$/,
      workbox.strategies.cacheFirst({
          cacheName: 'js-css',
      })
  );

  workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'icon',
        plugins: [
        new workbox.cacheableResponse.Plugin({
            statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
        ]
    })
  );
  console.log(`Workbox berhasil dimuat`);
}else
  console.log(`Workbox gagal dimuat`);

//new line push event API
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon/icon-192new.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

