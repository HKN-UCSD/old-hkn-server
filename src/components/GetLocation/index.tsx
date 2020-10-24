import React from 'react';
import { Link, Typography } from '@material-ui/core';

interface GetLocationProps {
    location: string
}

const GetLocation = (props: GetLocationProps) => {
    const { location } = props;
    try {
        new URL(location);
    } catch (_) {
        return <Typography>{location}</Typography>;
    }
    return <Link href={location}>{location}</Link>;
}

export default GetLocation;