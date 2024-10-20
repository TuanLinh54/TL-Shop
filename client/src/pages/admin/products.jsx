/* eslint-disable react/jsx-key */
import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: '',
}

function AdminProducts() {

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { productList } = useSelector(state => state.adminProducts);
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(addNewProduct({
            ...formData,
            image: uploadedImageUrl,
        })).then((data) => {
            console.log(data);
            if (data?.payload?.success) {
                dispatch(fetchAllProducts())
                setOpenCreateProductsDialog(false)
                setImageFile(null);
                setFormData(initialFormData)
                toast({
                    title: 'Add product successfully'
                })
            }
        })
    };

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    console.log(productList, uploadedImageUrl, "productList")

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
                {
                    productList && productList.length > 0
                        ? productList.map((productItem) =>
                        (<AdminProductTile
                            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                            setFormData={setFormData}
                            setCurrentEditedId={setCurrentEditedId}
                            product={productItem}
                        />
                        ))
                        : null
                }
            </div>
            <Sheet open={openCreateProductsDialog} onOpenChange={() => {
                setOpenCreateProductsDialog(false);
                setCurrentEditedId(null);
                setFormData(initialFormData);
            }}
            >
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>Add New Product</SheetTitle>
                    </SheetHeader>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isEditMode={currentEditedId !== null}
                    />
                    <div className="py-6">
                        <CommonForm
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={onSubmit}
                            buttonText='Add'
                            formControls={addProductFormElements}
                        />
                    </div>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;