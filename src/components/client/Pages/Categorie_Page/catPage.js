import React, { useState, useEffect } from "react";
import MainLayout from "../../../Layout/mainLayout";
import { Row, Col } from "reactstrap";
import { Radio, Card } from "antd";
import axios from "axios";
import clientConfig from "../../../../clientConfig";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../../loader.gif";
import { change_loader } from "../../../../redux/actions";

const { Meta } = Card;

const CatPage = () => {
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [cats, setCats] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    if (cats.length === 0 && posts.length === 0) {
      dispatch(change_loader(false));
      axios
        .get(`${clientConfig.siteUrl}/wp-json/wp/v2/categories`)
        .then((cats) => {
          console.log(cats);
          setCats(cats.data);
        });
      axios
        .get(`${clientConfig.siteUrl}/wp-json/wp/v2/posts?per_page=100`)
        .then((posts) => {
          console.log(posts);
          setPosts(posts.data);
          dispatch(change_loader(true));
        });
    } else {
    }
  });

  const checkCat = (catId) => {
    const filteredPosts = posts.filter((post) => post.categories[0] === catId);
    return setPostsList(filteredPosts);
  };
  console.log(postsList, "is posts list");
  return loader === false ? (
    <img className="loader" src={Loader} alt="درحال بارگذاری ..." />
  ) : (
    <MainLayout activePage="categories" activeRoute={["دسته بندی مطالب"]}>
      <Row>
        <Col className="text-center">
          <Radio.Group
            buttonStyle="solid"
            onChange={(e) => {
              console.log(e.target.value);
              //   console.log(e);
              checkCat(e.target.value);
            }}
          >
            {cats.map((cat) => {
              return <Radio.Button value={cat.id}>{cat.name}</Radio.Button>;
            })}
          </Radio.Group>
        </Col>
      </Row>
      <Row className="mt-5">
        {postsList.length > 0 ? (
          postsList.map((post) => (
            <Col xs={12} sm={12} md={6} lg={4} xl={3}>
              <Link className="none-link" to={`/posts/${post.id}`}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <img
                      alt="عکس کاربران"
                      src={
                        post.uagb_featured_image_src.large
                          ? post.uagb_featured_image_src.large[0]
                          : "assets/img_not_found.png"
                      }
                      width="100%"
                      height="200"
                    />
                  }
                >
                  <Meta title={post.title.rendered} />
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p className="cat-change">لطفا دسته بندی دیگری را انتخاب کنید !</p>
        )}
      </Row>
    </MainLayout>
  );
};

export default CatPage;
