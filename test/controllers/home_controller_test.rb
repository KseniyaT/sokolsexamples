require 'test_helper'

class HomeControllerTest < ActionController::TestCase
  test "should get index" do
    get :indexl
    assert_response :success
  end

end
