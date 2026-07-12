import fitz
import os


def pdf_to_images(pdf_path, output_folder="uploads/pdf_pages"):
    os.makedirs(output_folder, exist_ok=True)

    doc = fitz.open(pdf_path)

    image_paths = []

    for page_number in range(len(doc)):
        page = doc.load_page(page_number)

        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))

        image_path = os.path.join(
            output_folder,
            f"page_{page_number + 1}.png"
        )

        pix.save(image_path)

        image_paths.append(image_path)

    return image_paths