import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import { ResponsivePie } from '@nivo/pie';
// For swiper version 5.x
import Swiper from 'react-id-swiper';
import "swiper/css/swiper.css";

class SwiperSurveys extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

    renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return(
      <div style={{width: 400, height: 500, overflow: "visible"}} key={survey._id}>
        <div className="card darken-1" >
              <div className="card-content">
                <span className="card-title">{survey.title}</span>
                <div style={{ width: '100%', height: 300 }}>
            <ResponsivePie
                    width={350}
                    height={300}
                    data={[{
                    id:    'Yes',
                    label: 'Yes',
                    value: survey.yes,
                    color: 'hsl(237, 70%, 50%)'
                }, {
                    id:    'No',
                    label: 'No',
                    value: survey.no,
                    color: 'hsl(34, 70%, 50%)'
                }]}
                
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextXOffset={6}
                    radialLabelsTextColor="#000"
                    radialLabelsLinkOffset={0}
                    radialLabelsLinkDiagonalLength={16}
                    radialLabelsLinkHorizontalLength={24}
                    radialLabelsLinkStrokeWidth={1}
                    radialLabelsLinkColor={{ from: 'color' }}
                    slicesLabelsSkipAngle={10}
                    slicesLabelsTextColor="#000"
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}

                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'row',
                            translateY: 56,
                            itemWidth: 100,
                            itemHeight: 18,
                            itemTextColor: '#999',
                            symbolSize: 18,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                    ]}
                />
    </div>
                <p>{survey.body}</p>
                <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
              </div>
              <div className="card-action">
                <a href="#">Yes: {survey.yes}</a>
                <a href="#">No: {survey.no}</a>
              </div>
          </div>
      </div>
        )
    });
  }

  render() {
      const params = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
    },
    keyboard: true,
    pagination: {
    el: '.swiper-pagination'
    }
  }

    return (
    <Swiper {...params} shouldSwiperUpdate>

    {this.renderSurveys()}
    </Swiper>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SwiperSurveys);