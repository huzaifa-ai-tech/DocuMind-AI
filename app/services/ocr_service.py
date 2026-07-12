import easyocr

reader = easyocr.Reader(["en"], gpu=False)


def extract_text(image_path: str):

    result = reader.readtext(image_path, detail=0)

    return "\n".join(result)


def extract_multiple_pages(image_paths):

    final_text = ""

    for image in image_paths:

        final_text += extract_text(image)

        final_text += "\n\n"

    return final_text