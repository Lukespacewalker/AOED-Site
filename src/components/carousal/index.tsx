import * as React from "react";
import * as PropTypes from "prop-types";
import back_icon from "@images/ui/left-arrow.svg";
import next_icon from "@images/ui/right-arrow.svg"
import cstyle from "./carousal.module.scss";

class Carousal extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        //this.goTo = this.goTo.bind(this);
    }

    private childrenRefs : Array<React.RefObject<HTMLDivElement>>

    private myRef = React.createRef();

    private maxChildId : number;

    state = {
        index: 0
    }

    prev() {
        let purpose = this.state.index - 1;
        if(purpose < 0) { purpose = this.maxChildId}
        this.setState({ index: purpose });
    }

    next() {
        let purpose = this.state.index + 1;
        if(purpose > this.maxChildId) { purpose = 0}
        this.setState({ index: purpose });
    }

    goTo(id:number){
        this.setState({ index: id });
    }

    render() {
        const children = React.Children.map(this.props.children, (element,idx) => {
            this.maxChildId = idx;
            return React.cloneElement((element as any), { ref: idx })
        });
        const navs = [];
        for(let i = 0; i<=this.maxChildId;i++){
            if(this.state.index === i){
                navs.push(<b key={i} onClick={this.goTo.bind(this,i)}>{i+1}</b>)
            }else{
                navs.push(<span key={i} onClick={this.goTo.bind(this,i)}>{i+1}</span>)
            }
        }
        
        
        return (
            <div className={`${cstyle.container} ${this.maxChildId>0? cstyle.show: ""}`}>
                <div ref={this.myRef} className={cstyle.childrenContainer}>
                    {children}
                </div>
                <div className={cstyle.back} onClick={this.prev}>
                    <img src={back_icon} />
                </div>
                <div className={cstyle.next} onClick={this.next}>
                    <img src={next_icon} />
                </div>
                <div className={cstyle.nav} >
                    {navs}
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        const elem = (this.refs[this.state.index] as HTMLElement);
        let viewer = this.myRef.current as HTMLElement;
        if (typeof window !== 'undefined' && /Edge/.test(navigator.userAgent)) {
            //viewer.scrollTo({left:elem.offsetLeft, behavior:"smooth"});
            elem.scrollIntoView({behavior: "smooth", inline: "start"})
        }else{
            viewer.scrollTo({left:elem.offsetLeft, behavior:"smooth"});
            elem.scrollIntoView({behavior: "smooth", inline: "start"})
        }
    }
}

export default Carousal;