import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

export default class App extends React.Component {
    state = {
        items: [],
        start: 0,
        end: 10,
        isMore: true,
    };
    componentDidMount() {
        this.fetchMoreData();
        console.log(1);
    }
    fetchMoreData = () => {
        fetch(`http://localhost:3000/posts?_start=${this.state.start}&_end=${this.state.end}`, { method: "GET" })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.length > 0) {
                    this.setState({
                        items: this.state.items.concat(res),
                        start: this.state.end,
                        end: this.state.end + 10,
                    });
                } else {
                    this.setState({
                        isMore: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <nav class="navbar navbar-dark bg-dark">
                    <a href="https://oko.press/" class="navbar-brand">
                        LOGO
                    </a>
                </nav>
                <InfiniteScroll
                    className="container-fluid"
                    dataLength={this.state.items.length}
                    style={{ textAlign: "center" }}
                    next={this.fetchMoreData}
                    hasMore={this.state.isMore}
                    loader={<h4>Ładowanie...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Wow! Widziałeś już wszystko</b>
                        </p>
                    }
                >
                    {this.state.items.map((i, index) => (
                        <div className="card mx-auto m-5" style={{ width: 50 + "vw" }} key={index}>
                            <p className="card-text text-left m-0">{i.date}</p>
                            <img src={i.thumb} className="card-img-top" alt={i.thumb} />
                            <div className="card-body">
                                <h5 className="card-title text-left">{i.title}</h5>
                                <p className="card-text text-left">{i.excerpt}</p>
                                <a href={i.url} className="btn btn-primary">
                                    Więcej informacji
                                </a>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }
}
