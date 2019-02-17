import React from 'react';

const RouteContext = React.createContext({});

export const RouteProvider = RouteContext.Provider;
export const RouteConsumer = RouteContext.Consumer;