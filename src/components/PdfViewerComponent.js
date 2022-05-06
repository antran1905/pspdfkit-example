import axios from "axios";
import { useEffect, useRef, useState } from "react";
import pdfFile from '../test3.pdf';
import PSPDFKit from 'pspdfkit'
export default function PdfViewerComponent(props) {
  console.log("pdfFile", pdfFile);
  const [first, setFirst] = useState()

  const containerRef = useRef(null);
  const pdf = 'http://localhost:8099/SecuredStorage/Content/3c99b9f5-d397-4ce7-a8e9-8e44df86a4de/638d5dc3-ded1-4705-bdaa-4b615443161d/ac9bc6f4-c99c-4acc-88a5-ef23129cf12a/a2817841-6415-4f99-91e3-c26ecef9d6dc.pdf';
  const img = 'http://localhost:8099/SecuredStorage/Content/0e4b5616-5b50-40ac-b927-2100761d1f0a/d27a911f-894e-4269-a714-8a9715260c97/2422f29a-e72e-4e8d-bfb8-c12247cbd929/b23eae4d-1fd2-4f0e-ab1b-b93c6c10e68f.jpg'

  async function loadProtectedPDF(pdf) {
    const container = containerRef.current;

    const pdfResponse = await axios.get(pdf, {
      withCredentials: true,
      headers: {
        Accept: 'application/pdf'
      },
      responseType: 'blob',

    })
    console.log("pdfResponse", pdfResponse);

    const blob = new Blob([pdfResponse.data], { type: 'application/pdf' })

    blob.arrayBuffer().then((buffer) => {
      console.log("buffer",buffer);
      return PSPDFKit.load({
        container,
        document: buffer,
        container,
        baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
      });
    })

  }

  useEffect(() => {
    const container = containerRef.current;
    let PSPDFKit;
    loadProtectedPDF(pdf)
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
    //     document: `${window.location.protocol}//${window.location.host}/test3.pdf`,
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
