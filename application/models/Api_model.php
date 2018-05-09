<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');


	class Api_model extends CI_Model {



	public function __construct()
	{
		parent::__construct();
	}

	public function register($data)

	{
		 $this->mongo_db->insert('users',$data);
		 return true;
    }

    public function getUserByEmail($email_id)
	 {
	   	$this->mongo_db->select('id,name,email_id,phone_number,status,username,age', '_id');
	   	$this->mongo_db->where('username', $email_id);
	   	$this->mongo_db->where('status', 1);
	   	$this->mongo_db->where('is_deleted', 0);
	   	$this->mongo_db->limit(1);

	    $query = $this->mongo_db->get('users');
	 	return $query;
	 }

		



}
?>
