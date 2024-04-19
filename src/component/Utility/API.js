
// const Baseurl = "http://127.0.0.1:8000/"
// const Baseurl="http://192.168.1.208:7000/"
const Baseurl="http://103.131.196.61:42202/"
const Filter = Baseurl + 'Filter/'
const Chart = Baseurl + 'Chart/'
const Card = Baseurl + 'Card/'
const Common = Baseurl + 'Comman/'
const API = {

    LoginAPI: Baseurl + "login",
    RegisterAPI: Baseurl + "register",
    GetCompany: Filter + "GetCompany",
    GetBranch: Filter + "GetBranch",
    GetDepartment: Filter + "GetDepartment",
    GetItemGroup: Filter + "GetItemGroup",
    GetBrand: Filter + "GetBrand",
    GetSalesman: Filter + "GetSalesman",
    GetProduct: Filter + "GetProduct",
    GetSeason: Filter + "GetSeason",
    GetFit: Filter + "GetFit",
    GetColor: Filter + "GetColor",
    GetItemName: Filter + "GetItemName",
    GetLotNo: Filter + "GetLotNo",
    GetDesign: Filter + "GetDesign",
    GetDayBook: Filter + "GetDayBook",
    GetCity: Filter + "GetCity",
    GetState: Filter + "GetState",
    GetRegion: Filter + "GetRegion",
    GetStyle: Filter + "GetStyle",
    GetSalesParty: Filter + "GetSalesParty",
    GetPurchaseParty: Filter + "GetPurchaseParty",
    GetFilterGridByID:Filter + "GetFilterGridByID",
    FilterGridAddEdit: Filter + "FilterGridAddEdit",
    GetSalesCard: Card + "GetSalesCard",
    GetStockCard: Card + "GetStockCard",
    GetHourlySales: Chart + "GetHourlySales",
    GetSalesRevenue: Chart + "GetSalesRevenue",
    GetTopsellingproduct: Chart + "GetTopsellingproduct",
    GetTopsupplierbysales: Chart + "GetTopsupplierbysales",
    GetTopSalesmanBySales: Chart + "GetTopSalesmanBySales",
    GetCoustomerConversion: Chart + "GetCoustomerConversion",
    GetSalesAging: Chart + "GetSalesAging",
    GetMrpWiseRPT: Chart + "GetMrpWiseRPT",
    GetProfiteCard: Card + "GetProfiteCard",
    PDF: Baseurl + 'PDF/',
    GetCommonParam : Common + "ParmCaption",
    GetSubCategory : Common + "GetSubCategory",
    uploadImage : Common + "uploadImage",
    GetPDFUsingImage : Common + "GetPDFUsingImage",
    // GetStockToSalesAPI: Baseurl+"StockToSales/GetStockToSales",
    // DepartmentListAPI : Baseurl
}
export default API

