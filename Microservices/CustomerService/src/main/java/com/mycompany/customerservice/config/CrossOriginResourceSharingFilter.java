package com.mycompany.customerservice.config;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;

/**
 * Manages Access to calls from another origin.
 */
@Provider
public class CrossOriginResourceSharingFilter implements ContainerResponseFilter {

    @Override
    public void filter(final ContainerRequestContext requestContext, final ContainerResponseContext response) {
       response.getHeaders()
                .add("Access-Control-Allow-Origin", "*");
        response.getHeaders()
                .add("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE, HEAD");
        response.getHeaders()
                .add("Access-Control-Allow-Credentials", "true");
        response.getHeaders()
                .add("Access-Control-Allow-Headers", "origin, Content-Type, Accept, X-Requested-With, Authorization");
    }

}
