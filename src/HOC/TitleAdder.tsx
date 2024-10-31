import { Helmet } from "react-helmet-async";

const TitleAdder = (WrappedComponent: any, title: string) => {
  return (props: any) => {
    return (
      <>
        <Helmet>
          <title>اپ نوبت دهی | {title}</title>
        </Helmet>
        <WrappedComponent {...props} />{" "}
      </>
    );
  };
};

export default TitleAdder;
