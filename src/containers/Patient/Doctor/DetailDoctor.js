import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './DetailDoctor.scss'
import HomeHeader from '../../HomePage/HomeHeader'

import 'react-toastify/dist/ReactToastify.css';
import { getDetailDoctorService } from '../../../services/doctorService';




class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},

        }


    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getDetailDoctorService(id);
            await this.setState({
                detailDoctor: res.inforDoctor
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }




    render() {

        console.log(this.state.detailDoctor);
        let language = this.props.language;
        let inforVi = '';
        let inforEn = '';

        if (this.state.detailDoctor && this.state.detailDoctor.positionData) {
            inforVi = `${this.state.detailDoctor.positionData.valueVi}, ${this.state.detailDoctor.firstName} ${this.state.detailDoctor.lastName} `;
            inforEn = `${this.state.detailDoctor.positionData.valueEn}, ${this.state.detailDoctor.lastName} ${this.state.detailDoctor.firstName} `;

        }

        return (
            <>
                <HomeHeader />

                <div className="doctor-detail-container">
                    <div className="schedule-and-infor-doctor">

                        <div className="intro-doctor">
                            <div className="avatar-doctor" style={{ backgroundImage: `url(${this.state.detailDoctor && this.state.detailDoctor.image ? this.state.detailDoctor.image : ''})` }}>

                            </div>

                            <div className="content-doctor">
                                <h1>
                                    {language === 'vi' ? inforVi : inforEn}
                                </h1>
                                <div className="content">
                                    <p>
                                        {
                                            this.state.detailDoctor && this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.description &&
                                            <span dangerouslySetInnerHTML={{ __html: this.state.detailDoctor.Markdown.description }}></span>

                                        }
                                    </p>
                                </div>

                                <div className="button-social">
                                    <button className="btn-like">
                                        <i className="far fa-thumbs-up"></i> Like
                                    </button>
                                    <button className="btn-share">
                                        <i className="far fa-share-square"></i> Share
                                    </button>

                                </div>

                            </div>
                        </div>

                        <div className="schedule-doctor">

                        </div>


                    </div>


                    <div className="detail-infor-doctor">
                        <div className="block-content-detail">
                            {
                                this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.contentHtml &&
                                <div dangerouslySetInnerHTML={{ __html: this.state.detailDoctor.Markdown.contentHtml }}></div>
                            }

                        </div>
                    </div>
                </div>


            </>
        )
    }






}






const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
