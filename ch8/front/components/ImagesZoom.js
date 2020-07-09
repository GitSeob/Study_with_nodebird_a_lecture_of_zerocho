import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick'
import { Icon } from 'antd'
import styled from 'styled-components'

const Overlay = styled.div`
    position: fixed;
    z-index: 5000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Header = styled.header`
    height: 44px;
    background: white;
    position: relative;
    padding: 0;
    text-align: center;

    & h1 {
        margin: 0;
        font-size: 17px;
        color: #333;
        line-height: 44px;
    }
`;

const SlickWrapper = styled.div`
    height: calc(100% - 44px);
    background: #090909;
`;

const CloseBtn = styled(Icon)`
    position: absolute;
    right: 0;
    top: 0;
    padding: 15px;
    line-height: 14px;
    cursor: pointer;
`;

const Indicator = styled.div`
    width: 75;
    height: 30;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
`;

// 해당 html tag들이 저렇게 styled 적용이 된다.
// 인라인 스타일에서 sc = '~~' 로 바뀜.

const ImagesZoom = ({ images, onClose }) => {
    const [ currentSlide, setCurrentSlide ] = useState(0)

    return (
        <Overlay>
            <Header>
                <h1>상세 이미지</h1>    
                <CloseBtn type="close" onClick={onClose} />
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        afterChange={slide => setCurrentSlide(slide)}
                        infinite={false}
                        arrows
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {images.map((v)=>{
                            return(
                                <div style={{ padding: 32, textAlign: 'center' }}>
                                    <img src={`http://localhost:3065/${v.src}`} style={{ margin:'0 auto', maxHeight: 750}} />
                                </div>
                            )
                        })}
                    </Slick>
                    <div style={{ textAlign: 'center' }}>
                        <Indicator>{currentSlide+1}/{images.length}</Indicator>
                    </div>
                </div>
            </SlickWrapper>
        </Overlay>
    )
};

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        src: PropTypes.string,
    })).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;