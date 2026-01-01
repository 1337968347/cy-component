importScripts('./workbox-v4.3.1/workbox-sw.js');

let version = "0.011";

self.workbox.setConfig({
    modulePathPrefix: "./workbox-v4.3.1"
})

self.addEventListener("message", ({ data }) => {
    if (data === "skipWaiting") {
        self.skipWaiting();
    }
});

// svg photo
workbox.routing.registerRoute(
    new RegExp('.*\.svg'),
    workbox.strategies.cacheFirst({
        cacheName: 'svg',
    })
);

self.workbox.precaching.precacheAndRoute([
  {
    "url": "assets/iconfont/iconfont.js",
    "revision": "d0f6a7573811af58682caf4b5ff90ecf"
  },
  {
    "url": "build/index.esm.js",
    "revision": "cab23181a3f451fb0649b807c754b148"
  },
  {
    "url": "build/p-0c7vhi5n.entry.js"
  },
  {
    "url": "build/p-0ef20132.js"
  },
  {
    "url": "build/p-105bab28.js"
  },
  {
    "url": "build/p-14f0bf7a.js"
  },
  {
    "url": "build/p-15a768df.js"
  },
  {
    "url": "build/p-1jgyhvzd.entry.js"
  },
  {
    "url": "build/p-1rnv3zqy.entry.js"
  },
  {
    "url": "build/p-1watuztr.entry.js"
  },
  {
    "url": "build/p-20043846.js"
  },
  {
    "url": "build/p-23484c9a.js"
  },
  {
    "url": "build/p-247vyxx1.entry.js"
  },
  {
    "url": "build/p-2cts5oqz.entry.js"
  },
  {
    "url": "build/p-2e2cd18e.js"
  },
  {
    "url": "build/p-2tdkcfex.entry.js"
  },
  {
    "url": "build/p-316cddd3.js"
  },
  {
    "url": "build/p-32jbz5jz.entry.js"
  },
  {
    "url": "build/p-33ivk1cj.entry.js"
  },
  {
    "url": "build/p-36ddbbc3.js"
  },
  {
    "url": "build/p-3jppgtdi.entry.js"
  },
  {
    "url": "build/p-43cyuobl.entry.js"
  },
  {
    "url": "build/p-4wezlho1.entry.js"
  },
  {
    "url": "build/p-53ddc05f.js"
  },
  {
    "url": "build/p-5532d2ba.js"
  },
  {
    "url": "build/p-559f1738.js"
  },
  {
    "url": "build/p-5607a2d1.js"
  },
  {
    "url": "build/p-59epqwqm.entry.js"
  },
  {
    "url": "build/p-5bb8f71e.js"
  },
  {
    "url": "build/p-5c285b20.js"
  },
  {
    "url": "build/p-5e1589de.js"
  },
  {
    "url": "build/p-5xbq8rgh.entry.js"
  },
  {
    "url": "build/p-6495bd92.js"
  },
  {
    "url": "build/p-69a2e6ec.js"
  },
  {
    "url": "build/p-6afc0zzi.entry.js"
  },
  {
    "url": "build/p-6jrqtgao.entry.js"
  },
  {
    "url": "build/p-6wvb0i7e.entry.js"
  },
  {
    "url": "build/p-7021fe2a.js"
  },
  {
    "url": "build/p-716d1419.js"
  },
  {
    "url": "build/p-7d6524ec.js"
  },
  {
    "url": "build/p-7fe253be.js"
  },
  {
    "url": "build/p-7tim4m4h.entry.js"
  },
  {
    "url": "build/p-8a939906.js"
  },
  {
    "url": "build/p-8be1997b.js"
  },
  {
    "url": "build/p-8e0dcdf2.js"
  },
  {
    "url": "build/p-8ecarfuw.entry.js"
  },
  {
    "url": "build/p-8hwjbzaq.entry.js"
  },
  {
    "url": "build/p-8tjhnxfw.entry.js"
  },
  {
    "url": "build/p-900143dd.js"
  },
  {
    "url": "build/p-90b38247.js"
  },
  {
    "url": "build/p-91f2f1ea.js"
  },
  {
    "url": "build/p-9bm6yk8c.entry.js"
  },
  {
    "url": "build/p-9qwwj0gd.entry.js"
  },
  {
    "url": "build/p-a3qo5oex.entry.js"
  },
  {
    "url": "build/p-a7iwdu3q.entry.js"
  },
  {
    "url": "build/p-affe7c09.js"
  },
  {
    "url": "build/p-alaybtiv.entry.js"
  },
  {
    "url": "build/p-amuc0bso.entry.js"
  },
  {
    "url": "build/p-atvjv4p9.entry.js"
  },
  {
    "url": "build/p-b2aslriw.entry.js"
  },
  {
    "url": "build/p-b2lbaxqc.entry.js"
  },
  {
    "url": "build/p-b9bccfd6.js"
  },
  {
    "url": "build/p-bf9feb13.js"
  },
  {
    "url": "build/p-bhfmeyq5.entry.js"
  },
  {
    "url": "build/p-bl8u87wy.entry.js"
  },
  {
    "url": "build/p-bmmi56mp.entry.js"
  },
  {
    "url": "build/p-carmodwy.entry.js"
  },
  {
    "url": "build/p-ci0244xv.entry.js"
  },
  {
    "url": "build/p-d0882b30.js"
  },
  {
    "url": "build/p-d7254bc1.js"
  },
  {
    "url": "build/p-d8631f0b.js"
  },
  {
    "url": "build/p-d9disaqp.entry.js"
  },
  {
    "url": "build/p-dbphi6ns.entry.js"
  },
  {
    "url": "build/p-dbyr1flt.entry.js"
  },
  {
    "url": "build/p-dcmanlir.entry.js"
  },
  {
    "url": "build/p-dzb5cv28.entry.js"
  },
  {
    "url": "build/p-eautc8eh.entry.js"
  },
  {
    "url": "build/p-eivexet6.entry.js"
  },
  {
    "url": "build/p-ervpxvm6.entry.js"
  },
  {
    "url": "build/p-ew10pbpg.entry.js"
  },
  {
    "url": "build/p-eyv0u4sj.entry.js"
  },
  {
    "url": "build/p-f14a9a94.js"
  },
  {
    "url": "build/p-f1a4df63.js"
  },
  {
    "url": "build/p-f1d2b38d.js"
  },
  {
    "url": "build/p-f8acc8c5.js"
  },
  {
    "url": "build/p-f9bnuuw4.css"
  },
  {
    "url": "build/p-fhd1uuog.entry.js"
  },
  {
    "url": "build/p-fitf1jpm.entry.js"
  },
  {
    "url": "build/p-fmiwydk0.entry.js"
  },
  {
    "url": "build/p-fmutq6ho.entry.js"
  },
  {
    "url": "build/p-g8jjtklz.entry.js"
  },
  {
    "url": "build/p-gatxnfkf.entry.js"
  },
  {
    "url": "build/p-gghkrccu.entry.js"
  },
  {
    "url": "build/p-gintqdan.entry.js"
  },
  {
    "url": "build/p-gk0n3ihi.entry.js"
  },
  {
    "url": "build/p-gkvtgaiu.entry.js"
  },
  {
    "url": "build/p-h3zcgfrf.entry.js"
  },
  {
    "url": "build/p-hgdni6wh.entry.js"
  },
  {
    "url": "build/p-hqs7w6lj.entry.js"
  },
  {
    "url": "build/p-iifhzfo1.entry.js"
  },
  {
    "url": "build/p-it4tfm0g.entry.js"
  },
  {
    "url": "build/p-iwftqfta.entry.js"
  },
  {
    "url": "build/p-j5kqytdj.entry.js"
  },
  {
    "url": "build/p-j9noxxap.entry.js"
  },
  {
    "url": "build/p-japrek6s.entry.js"
  },
  {
    "url": "build/p-jkhptrin.entry.js"
  },
  {
    "url": "build/p-jmizorky.entry.js"
  },
  {
    "url": "build/p-jmjvghel.entry.js"
  },
  {
    "url": "build/p-joof3yce.entry.js"
  },
  {
    "url": "build/p-jrk5vhmx.entry.js"
  },
  {
    "url": "build/p-jwgxqlbj.entry.js"
  },
  {
    "url": "build/p-kod6yisj.entry.js"
  },
  {
    "url": "build/p-ktpcnzec.entry.js"
  },
  {
    "url": "build/p-kvpwcxjz.entry.js"
  },
  {
    "url": "build/p-kvzzyqdp.entry.js"
  },
  {
    "url": "build/p-ldkpcsf1.entry.js"
  },
  {
    "url": "build/p-lgwpadqf.entry.js"
  },
  {
    "url": "build/p-lhisgv8d.entry.js"
  },
  {
    "url": "build/p-ll2gayuy.entry.js"
  },
  {
    "url": "build/p-luqcpyef.entry.js"
  },
  {
    "url": "build/p-luyk9gtn.entry.js"
  },
  {
    "url": "build/p-lwvckqsy.entry.js"
  },
  {
    "url": "build/p-m5shu352.entry.js"
  },
  {
    "url": "build/p-ma2rtelc.entry.js"
  },
  {
    "url": "build/p-mbeba54k.entry.js"
  },
  {
    "url": "build/p-mebgwivh.entry.js"
  },
  {
    "url": "build/p-mppx1saw.entry.js"
  },
  {
    "url": "build/p-mqh3iid5.entry.js"
  },
  {
    "url": "build/p-mszmvjgd.entry.js"
  },
  {
    "url": "build/p-nappvttc.entry.js"
  },
  {
    "url": "build/p-nzyb5hva.entry.js"
  },
  {
    "url": "build/p-ophlxruo.entry.js"
  },
  {
    "url": "build/p-oqmtcpw2.entry.js"
  },
  {
    "url": "build/p-oxgiu8kn.entry.js"
  },
  {
    "url": "build/p-p4tqapfb.entry.js"
  },
  {
    "url": "build/p-pgps7lvs.entry.js"
  },
  {
    "url": "build/p-pjaeqjog.entry.js"
  },
  {
    "url": "build/p-pmptvlyu.entry.js"
  },
  {
    "url": "build/p-pwmlnvii.entry.js"
  },
  {
    "url": "build/p-qdbecwww.entry.js"
  },
  {
    "url": "build/p-qioajbxe.entry.js"
  },
  {
    "url": "build/p-qlu24w39.entry.js"
  },
  {
    "url": "build/p-qphhebxm.entry.js"
  },
  {
    "url": "build/p-qqpaztw6.entry.js"
  },
  {
    "url": "build/p-qrwwibfb.entry.js"
  },
  {
    "url": "build/p-rn2puwuo.entry.js"
  },
  {
    "url": "build/p-rubt62gn.entry.js"
  },
  {
    "url": "build/p-ryebixxj.entry.js"
  },
  {
    "url": "build/p-sh4qnzv9.entry.js"
  },
  {
    "url": "build/p-smvsnpef.entry.js"
  },
  {
    "url": "build/p-tcbz9u0u.entry.js"
  },
  {
    "url": "build/p-tphkhqf9.entry.js"
  },
  {
    "url": "build/p-trcl96dq.entry.js"
  },
  {
    "url": "build/p-tuotx0ch.entry.js"
  },
  {
    "url": "build/p-tvtmcwve.entry.js"
  },
  {
    "url": "build/p-u9qihfgp.entry.js"
  },
  {
    "url": "build/p-uheub02i.entry.js"
  },
  {
    "url": "build/p-v5kmcbm2.entry.js"
  },
  {
    "url": "build/p-v86ymncr.entry.js"
  },
  {
    "url": "build/p-weyld2pp.entry.js"
  },
  {
    "url": "build/p-wfaenjdm.entry.js"
  },
  {
    "url": "build/p-wo83nhfc.entry.js"
  },
  {
    "url": "build/p-x22bvafs.entry.js"
  },
  {
    "url": "build/p-xbwywu7n.entry.js"
  },
  {
    "url": "build/p-xmajhwxg.entry.js"
  },
  {
    "url": "build/p-xmjijxjd.entry.js"
  },
  {
    "url": "build/p-xrxoragb.entry.js"
  },
  {
    "url": "build/p-xssluzdu.entry.js"
  },
  {
    "url": "build/p-yg0mjtyt.entry.js"
  },
  {
    "url": "build/p-ynd0h1pu.entry.js"
  },
  {
    "url": "build/p-zdartzvs.entry.js"
  },
  {
    "url": "build/p-zh3umqxo.entry.js"
  },
  {
    "url": "build/p-zosgjyer.entry.js"
  },
  {
    "url": "build/swiper/swiper.bundle.js",
    "revision": "acf299a67b6b769e6c64a62e3d37918d"
  },
  {
    "url": "build/swiper/swiper.js",
    "revision": "c367d2eccf6c79b874c8df5b7fd0721d"
  },
  {
    "url": "index.html",
    "revision": "226fda938d7eb3281e3b51c263835f4d"
  }
]);