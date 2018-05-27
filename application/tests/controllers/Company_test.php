<?php
/**
 * Part of ci-phpunit-test
 *
 * @author     Kenji Suzuki <https://github.com/kenjis>
 * @license    MIT License
 * @copyright  2015 Kenji Suzuki
 * @link       https://github.com/kenjis/ci-phpunit-test
 */

class Company_test extends TestCase
{
	//test case for fetching all the companies
	public function test_getall()
	{
		$output = $this->request('GET', 'company/getall');
		$this->assertResponseCode(200);
	}

	//test case  to add the company
	public function test_addCompany()
	{
		$output = $this->request('POST', 'company/addCompany', [
				'name' => 'test Company',
				'subtitle' => 'test_company',
				'address' => 'test address',
				'website' => 'test_company.com',
			]);
		$this->assertResponseCode(200);
	}

	//test case to remove the company
	public function test_removeCompany()
	{
		$output = $this->request('POST', 'company/removeCompany', [
				'id' => 5,
			]);
		$this->assertResponseCode(200);
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
