import React, { useState, useEffect } from "react";

import axios from 'axios';

export default function Homepage () {

    axios.get('http://localhost:5000/users/homepage')


    return(
        <div>This is the homepage</div>
    )

}