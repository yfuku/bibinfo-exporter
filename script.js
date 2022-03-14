javascript: (function () {
    var p = document.getElementById("productTitle");//書籍のタイトルの処理
    if (!p) var p = document.getElementById("ebooksProductTitle");
    var title = p.innerText.trim();
    var asin = document.getElementById('ASIN');//ASIN番号の処理
    if (asin) {
        var a = asin.value;
    } else {
        var asin = document.getElementsByName('ASIN.0')[0], a = asin.value;
    }
    //登録情報欄を取得
    var detail = document.getElementById('detailBullets_feature_div');
    if (!detail) {
        var subdoc = document.getElementById("product-description-iframe").contentWindow.document;
        var detail = subdoc.getElementById("detailBullets_feature_div");
    }
    var detailtext = detail.innerText;
    var pubdata = detailtext.split(/\n/);
    pubdata[2] = pubdata[2].slice(10);//出版社
    pubdata[1] = pubdata[1].slice(10);//出版社
    //var publish = pubdata.filter(pubdata => detailtext.match(/\出版社/));
    //var publisher = publish[0];//出版社
    var url = 'https://www.amazon.co.jp/exec/obidos/ASIN/' + a;
    var link = '[' + title + '](' + url + ')';


    var image = document.getElementById("imgBlkFront");//書影の処理
    if (!image) var image = document.getElementById("ebooksImgBlkFront");
    var imageurl = image.getAttribute("src");
    var pub = [];//著者情報の処理
    var c = document.getElementsByClassName('author');
    for (g = 0; g < c.length; g++) {
        var at = c[g].innerText.replace(/\r?\n/g, '').replace(/,/, '');
        var pu = at.match(/\(.+\)/);
        var ct = at.replace(/\(.+\)/, '').replace(/ /g, '');
        pub.push(pu + ' [[' + ct + ']]');
    }
    var author = pub.join(' ');
    // 自分が必要なパラメータに変換
    var h1title = '# 『' + title + '』\n\n';
    var mdimage = '\n![|100](' + imageurl + ')\n';
    // 表示させたい項目
    var lines = h1title + link + mdimage + author + '\n' + pubdata[1] + '\n' + pubdata[2];
    document.getElementById('bookDescription_feature_div').innerHTML = '<textarea style="height:500px">' + lines + '</textarea>';

})();   