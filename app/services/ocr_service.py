import cv2
from rapidocr import EngineType, LangRec, ModelType, OCRVersion, RapidOCR

engine = RapidOCR(
    params={
        "Global.log_level": "warning",
        "Rec.engine_type": EngineType.ONNXRUNTIME,
        "Rec.lang_type": LangRec.EN,
        "Rec.model_type": ModelType.MOBILE,
        "Rec.ocr_version": OCRVersion.PPOCRV4,
    }
)


def preprocess(image_path: str):
    image = cv2.imread(image_path)

    if image is None:
        raise ValueError(f"Could not read image: {image_path}")

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    gray = cv2.resize(
        gray,
        None,
        fx=2,
        fy=2,
        interpolation=cv2.INTER_CUBIC,
    )

    gray = cv2.createCLAHE(
        clipLimit=2.0,
        tileGridSize=(8, 8),
    ).apply(gray)

    return gray


def extract_text(image_path: str):

    processed = preprocess(image_path)

    result = engine(processed)

    return "\n".join(result.txts)


def extract_multiple_pages(image_paths):

    final_text = ""

    for image in image_paths:

        final_text += extract_text(image)

        final_text += "\n\n"

    return final_text
