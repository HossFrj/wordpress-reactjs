import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

class Page404 extends Component {
  render() {
    return (
      
        <div class="container page_404 text-center">
          <div class="row align_404" >
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h1 class="text-center " style={{fontFamily:"IRANsans"}}>404</h1>
                </div>

                <div class="contant_box_404">
                  <h3 class="h2">مثل اینکه گمشدی !</h3>

                  <p>صفحه مورد نظر یافت نشد !</p>

                  <Link to="/" class="">
                  <Button color="success">
                    صفحه اصلی
                    </Button>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    );
  }
}

export default Page404;
