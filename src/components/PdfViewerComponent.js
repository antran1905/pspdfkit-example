import axios from "axios";
import { useEffect, useRef, useState } from "react";
import pdfFile from '../test3.pdf';
import PSPDFKit from 'pspdfkit'
export default function PdfViewerComponent(props) {
  console.log("pdfFile", pdfFile);
  const [first, setFirst] = useState()

  const containerRef = useRef(null);
  const pdf = 'http://localhost:8099//SecuredStorage/Content/35cd0d03-857c-4cb1-bbb5-d6cf63a11326/fc243e04-9d4b-4ff7-81d1-58e2de932f7d/72b417ba-6c8a-4caf-a2b6-a4ae719513a2/332639ef-c7d3-477e-8f99-62781bbbf873.pdf';
  const img = 'http://localhost:8099/SecuredStorage/Content/0e4b5616-5b50-40ac-b927-2100761d1f0a/d27a911f-894e-4269-a714-8a9715260c97/2422f29a-e72e-4e8d-bfb8-c12247cbd929/b23eae4d-1fd2-4f0e-ab1b-b93c6c10e68f.jpg'

  const fetchPDFFile = async () => {

    const res = await axios.get(img,
      {
        withCredentials: true,
      }
    );
    console.log("res", res);
    console.log("type", typeof res.data);
    setFirst(res.data)
  };

  async function loadProtectedPDF(pdf) {
    const container = containerRef.current;

    const pdfResponse = await axios.get(pdf, {
      withCredentials: true,
      headers: {
        Accept: 'application/pdf'
      }
    });
    console.log("pdfResponse",pdfResponse);
    const blob = new Blob([pdfResponse.data],{type: 'text/plain ; charset=utf-8'})
    blob.arrayBuffer().then((buffer) => {
      return PSPDFKit.load({
        container,
        document: buffer,
        container,
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
  
      });
    })
    // const documentBuffer = await pdfResponse.data.arrayBuffer();
    // console.log("documentBuffer",documentBuffer);

    // Pass the `ArrayBuffer` as a PDF option instead of a URL.
    
  }

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;
    loadProtectedPDF(pdf)
    // fetchPDFFile();
    // (async function () {
    //   PSPDFKit = await import("pspdfkit");

    //   // Disable continuous scroll and default to double-page mode.
    //   const initialViewState = new PSPDFKit.ViewState({
    //     scrollMode: PSPDFKit.ScrollMode.PER_SPREAD,
    //     layoutMode: PSPDFKit.LayoutMode.SINGLE,
    //     keepFirstSpreadAsSinglePage: true,
    //   });

    //   const instance = await PSPDFKit.load({
    //     container,
    //     document: pdf,
    //     baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
    //     initialViewState,
    //   });
    //   instance.setViewState(viewState => viewState.set("showToolbar", !viewState.showToolbar));
    // })();

    return () => PSPDFKit && PSPDFKit.unload(container);
  }, [props.document]);



  return (
    <>
      <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
      <img src={first} alt="" />
    </>
  );
}
