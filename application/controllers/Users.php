<?php

ini_set("display_errors","0");

error_reporting(1);

if (!defined('BASEPATH')) exit('No direct script access allowed');
require APPPATH . '/libraries/REST_Controller.php';

class Users extends REST_Controller

{

    function __construct()
    {   
        parent::__construct();
        $this->load->helper('url');
        $this->load->library('session');
        $this->load->model('api_model');
    }

    

    public function signup_post()
    {
        $post_data = $this->post();

        $post_data['name'] = str_replace("+", " ", $post_data['name']);
        $post_data['username'] = str_replace("%40", "@", $post_data['username']);
       
        $emailExist = $this->api_model->getUserByEmail($post_data['username']);
        if (count($emailExist) > 0) {
                 $this->set_response(['status' => FALSE, 'message' => 'email Id already exist'], REST_Controller::HTTP_BAD_REQUEST);
                return;

        }

       
        if (isset($post_data['password']) )
            $post_data['password'] = md5($post_data['password']);
        
       

        $post_data['status'] = 1;
        $post_data['is_deleted'] = 0;
        $post_data['is_blocked'] = 0;
        $post_data['authentication_token'] = $this->randomString();
        $post_data['id'] = $this->api_model->update_counter('users_count');

        $this->api_model->register($post_data);
      
        $result = $this->api_model->getUserByEmail($post_data['username']);
        unset($result[0]['_id']);

        $this->set_response(['status' => TRUE, 'data' => $result[0], 'message' => 'User has been registered successfully'], REST_Controller::HTTP_OK);
    }

    

    public function login_post()
    {
        $post_data = $this->post();
        $requiredFields = array(
            'username',
            'password'
        );
        $message = $this->validate($post_data, $requiredFields);
        if ($message != '') {
            $this->set_response(['status' => FALSE, 'message' => $message], REST_Controller::HTTP_BAD_REQUEST);
            return;
        }

        $result = $this->api_model->checkAccountLogin($post_data);

        if ($result == false) {
            $this->set_response(['status' => FALSE, 'message' => 'username or the password do not match'], REST_Controller::HTTP_BAD_REQUEST);
            return;
        }
        else {
            $authToken = $this->randomString();
            $result[0]['authentication_token'] = $authToken;
            $result[0]['skills'] = $this->api_model->getSkill( array("user_id" => (int) $result[0]['id']) ); 
            $result[0]['experiences'] = $this->api_model->getExperience(array("user_id" => (int) $result[0]['id']) );
            $result[0]['educations'] = $this->api_model->getEducation( array("user_id" => (int) $result[0]['id']) ); 

            $this->set_response(['status' => TRUE, 'data' => $result[0], 'message' => 'User has logged in successfully'], REST_Controller::HTTP_OK);
        }
    }

    public function update_post(){
        $post_data = $this->post();
        $exp = $post_data['experiences'];
        unset($post_data['experiences']);
        for ($i = 0; $i < count($exp); $i++) {
            $exp[$i]['user_id'] = $post_data['id'];
           $exp[$i]['id'] = $this->api_model->update_counter('exp_count');

            $result = $this->api_model->addExperience( $exp[$i]);
        }
        
       
        $result1 = $this->api_model->update_user($post_data, array(
            "id" => (int)$post_data['id']
        ));
        $result2 = $this->api_model->getUser($post_data['id']);
        $result2[0]['experiences'] = $exp;
        $this->set_response(['status' => TRUE, 'data' => $result2[0], 'message' => 'User has been updated  successfully'], REST_Controller::HTTP_OK);

    }

    public function addExperience_post(){
        $post_data = $this->post();
         $post_data['id'] = $this->api_model->update_counter('exp_count');
        $result = $this->api_model->addExperience( $post_data); 
        $result = $this->api_model->getExperience(  array("id" => (int) $post_data['id'])   ); 
         unset($result[0]['_id']);
        $this->set_response(['status' => TRUE, 'data' => $result[0], 'message' => 'Experience has been added  successfully'], REST_Controller::HTTP_OK);

    }




    public function addSkill_post(){
        $post_data = $this->post();
        $post_data['id'] = $this->api_model->update_counter('skill_count');
        $result = $this->api_model->addSkill( $post_data); 
        $result = $this->api_model->getSkill( array("id" => (int) $post_data['id']) ); 
         unset($result[0]['_id']);
        $this->set_response(['status' => TRUE, 'data' => $result[0], 'message' => 'Skill has been added  successfully'], REST_Controller::HTTP_OK);

    }

   

    public function removeExperience_post(){
        $post_data = $this->post();
        $result = $this->api_model->removeExperience( $post_data['id'] ); 
        $this->set_response(['status' => TRUE, 'data' => $result[0], 'message' => 'Experience has been deleted  successfully'], REST_Controller::HTTP_OK);

    }

   
    private function validate($data, $requiredFields = array())
    {
        $message = '';
        $count = 0;
        for ($i = 0; $i < count($requiredFields); $i++) {
            if (array_key_exists($requiredFields[$i], $data) && trim($data[$requiredFields[$i]]) == '') {
                $count++;
                if ($count != 1) $message.= ", ";
                $message.= $requiredFields[$i];
            }
            else
            if (!array_key_exists($requiredFields[$i], $data)) {
                $message = $requiredFields[$i] . " key is missing";
                return $message;
            }
        }

        if ($message != '') {
            if ($count > 1) $message.= " fields are required.";
            else $message.= " field is required";
        }

        return $message;
    }

    
    private function randomString()
    {
        $timestamp = str_replace(' ', '', microtime());
        $timestamp = str_replace('.', '', $timestamp);
        $length = 10;
        $chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $str = "";
        for ($i = 0; $i < $length; $i++) {
            $str.= $chars[mt_rand(0, strlen($chars) - 1) ];
        }

        $str = $str . $timestamp;
        return $str;
    }


}
