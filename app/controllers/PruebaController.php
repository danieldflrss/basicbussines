<?php

class PruebaController extends \BaseController
{

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $headers = array(
            'Cache-Control' => ' no-cache, no-store, must-revalidate',
            'Pragma' => ' no-cache',
            'Expires' => ' 0');
        return Response::view('hello', array(), 200, $headers);
//        return Response::json(array('msg' =>'user not logged in'),'401');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        
    }
     /**
     * Display pdf file.
     *
     * @return appication/pdf
     */
    public function pdf() {
        //crear Pdf
        $mpdf = new PDF();
        $mpdf->Output();
    }

}
