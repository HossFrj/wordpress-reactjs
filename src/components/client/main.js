import React, { useState } from "react";
import MainLayout from "../Layout/mainLayout";
import { Row, Col, Card, CardImg, CardBody } from "reactstrap";
import { Typography, Divider, Tag } from "antd";
import axios from "axios";
import clientConfig from "../../clientConfig";
import { Link } from "react-router-dom";
import Loader from "../../loader.gif";
import { useSelector, useDispatch } from "react-redux";
import { change_loader } from "../../redux/actions";

const { Paragraph } = Typography;

const Posts = () => {
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const all_tags = useSelector(state => state.tags)

  if(data.length === 0){
    axios
    .get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts?per_page=50`)
    .then((res) => {
      setData(res.data);
      dispatch(change_loader(true))
      // console.log(res.data, "is response");
    })
    .catch((err) => console.error(err, "is error!"));
  }else{
    
  }
 
  // console.log(data);
  // console.log(data);
  return loader === false?(
    <img className="loader" src={Loader} alt="درحال بارگذاری ..."/>
  ):(
    <MainLayout activePage="main">
      <Row>
        {data.map((post) => {
          return (
            <Col className="mb-2" sm={12} xs={12} md={6} xl={3} lg={4}>
              <Card>
                <Link className="none-link" to={`/posts/${post.id}`}>
                  <CardImg
                    alt={post.title.rendered}
                    className="posts-img"
                    src={
                      post.uagb_featured_image_src.medium[0]
                        ? post.uagb_featured_image_src.medium[0]
                        : "assets/img_not_found.png"
                    }
                    width="100%"
                    height="200px"
                  />
                </Link>
                <CardBody>
                  {post.title.rendered}
                  <Divider />
                  <Paragraph
                    ellipsis={{ rows: 2, expandable: false }}
                    title="..."
                  >
                    <div>{(post.content.rendered)}</div>
                  </Paragraph>
                  <Link className="none-link" to={`/posts/${post.id}`}>
                    <span>... ادامه مطلب</span>
                  </Link>
                  <Divider />
                  {(post.tags.length > 0)?(
                    post.tags.map(tag => {
                      let tagId = (tag)
                      let foundTag = all_tags.find(tag => tag.id === tagId)
                      return foundTag ? <Tag color={`#${Math.floor(Math.random()*1000000)}`}>{foundTag.name}</Tag> : ""
                    })
          )
                  :
                    ("تگی وجود ندارد !")
                  }
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </MainLayout>
  );
};

export default Posts;
