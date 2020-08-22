import React from "react";

import earthLoader from '../../assets/images/earth-loader.gif';

const Loader = () => (
    <div data-testid="loader">
        <img className="loader" src={earthLoader} alt="Earth Loader" />
    </div>
);

export default Loader;
