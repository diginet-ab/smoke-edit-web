import React from "react";
import { RecordContextProvider, useGetOne } from "react-admin";

export const RecordFetcher = ({ id, resource, children }: any) => {
    const { data: record, isLoading, error } = useGetOne(resource, { id });
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <RecordContextProvider value={record}>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { record } as any);
                }
                return child;
            })}
        </RecordContextProvider>
    );
};

