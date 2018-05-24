<?php
/**
 * Part of ci-phpunit-test
 *
 * @author     Kenji Suzuki <https://github.com/kenjis>
 * @license    MIT License
 * @copyright  2015 Kenji Suzuki
 * @link       https://github.com/kenjis/ci-phpunit-test
 */

class User_test extends TestCase
{
	//test case for to signup the user
	public function test_signup()
	{
		$output = $this->request('POST', 'users/signup', [
				'name' => 'Mike Smitha',
				'username' => 'mike@eapaale.jp',
				'password' => '123456'
			]);
		$this->assertResponseCode(200);
	}


	//test case for correct username and password
	public function test_loginSuccess()
	{
		$output = $this->request('POST', 'users/login', [
				'username' => 'mike@exaple.jp',
				'password' => '123456'
			]);
		$this->assertResponseCode(200);
	}

	//test case for wrong username and password
	public function test_loginFail()
	{
		$output = $this->request('POST', 'users/login', [
				'username' => 'mike@exaple.jp',
				'password' => '156'
			]);
		$this->assertResponseCode(400);
	}

	public function test_APPPATH()
	{
		$actual = realpath(APPPATH);
		$expected = realpath(__DIR__ . '/../..');
		$this->assertEquals(
			$expected,
			$actual,
			'Your APPPATH seems to be wrong. Check your $application_folder in tests/Bootstrap.php'
		);
	}
}
