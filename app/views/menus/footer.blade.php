<div id="footer">
    <div class="container">
        <div class="row">
            <div class = "col-lg-6">
                <p class="text-muted">
                    {{Config::get('constants.application.name');}} |V:{{Config::get('constants.application.version');}}.
                    Realisado por <a href = "mailto:administrador@basicbusiness.com.mx">Damaso Daniel Flores Sosa</a> <a href = "https://plus.google.com/101226319784879202867" rel = "publisher">Google+</a>
                </p>
            </div>
            <div class = "col-lg-2">
                <p class="text-muted">
                <div class = "g-plusone" data-size = "medium"></div>
                </p>
            </div>
            <div class = "col-lg-4">
                <p class="text-muted">
                <div class="fb-like" data-href="https://www.facebook.com/basicbusiness" data-width="450" data-show-faces="true" data-send="true"></div>
                <div id = "fb-root"></div>
                </p>
            </div>
        </div>
    </div>
</div>
<script type = "text/javascript">(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/es_LA/all.js#xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    (function() {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
    })();</script>