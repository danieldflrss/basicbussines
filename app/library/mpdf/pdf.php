<?php

class PDF extends mPDF
{

    function PDF()
    {
        parent::mPDF();
        $file = "../public/app/styles/reportesPdf.css";
        if (file_exists($file) == true) {
            $stylesheet = file_get_contents($file);
            $this->WriteHTML($stylesheet, 1);
        }
        $this->createHeader();
        $this->createFooter();
         $this->WriteHTML('');
    }

    public function createHeader()
    {
        $this->SetMargins(10, 10, 30);
        $this->margin_header = 5;
        $header =<<<Q
<table class="header" width="100%"><tr>
<td width="33%"><img src="app/images/logo-protek-reporte.png"></img></td>
<td width="33%"></td>
<td width="33%"><img src="app/images/logo-sia-reporte.png"></img></td>
</tr></table>
Q;
$this->SetHTMLHeader($header);
    }

    public function createFooter()
    {
        $this->margin_footer= 4;
        $footer =<<<Q
<table class="footer" width="100%"><tr>
<td class="logo-footer" width="45%"><img src="app/images/logo-footer-reporte.png"></img></td>
<td class="pager-text" width="30%">© Basic Bussiness 2014</td>
<td class="pager-text" width="25%"><span>{PAGENO}</span></td>
</tr></table>
Q;
        $this->SetHTMLFooter($footer,'O');
    }

}
