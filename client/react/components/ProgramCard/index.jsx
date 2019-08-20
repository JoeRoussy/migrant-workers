import React from 'react';
import { connect } from 'react-redux';

import './styles.css';

const ProgramCard = ({
    program
}) => (
    <div class="programCard">
        <h2>{program.name}</h2>
    </div>
);

const mapStateToProps = ({

}) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ProgramCard);