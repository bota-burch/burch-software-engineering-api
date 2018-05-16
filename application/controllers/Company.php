<?php

ini_set("display_errors","0");

error_reporting(1);

if (!defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Company extends REST_Controller

{
    function __construct()
    {   
        parent::__construct();
        $this->load->helper('url');
        $this->load->library('session');
        $this->load->model('api_model');
    }

    

   public function addCompany_post(){
        $post_data = $this->post();
         $post_data['id'] = $this->api_model->update_counter('company_count');
        $result = $this->api_model->addCompany( $post_data); 
        $result = $this->api_model->getCompanyById( $post_data['id'] ); 
         unset($result[0]['_id']);
        $this->set_response(['status' => TRUE, 'data' => $result[0], 'message' => 'Company has been added  successfully'], REST_Controller::HTTP_OK);

    }



    public function getall_get()
    {
        $get_data = $this->get();
       
        $get_data['name'] = isset($get_data['name']) ? $get_data['name'] : null;

        $result = $this->api_model->getCompany($get_data['name']);
        if (count($result) > 0) {
            $this->set_response(['status' => TRUE, 'data' => $result, 'message' => ''], REST_Controller::HTTP_OK);
        }
        else {
            $this->set_response(['status' => FALSE, 'message' => 'Error in getting the company list'], REST_Controller::HTTP_OK);
        }
    }

}