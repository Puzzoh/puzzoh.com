export interface VoucherTypes {
  id?: string,
  title: string,
  description?: string,
  category: string,
  priceBefore: number,
  priceAfter: number,
  maxRedeem: number,
  expireDate: Date,
}

export interface VoucherImgTypes {
  vendorID: number,
  voucherID: string,
  id: number
}

export interface FileTypes {
  id?: number,
  title: string,
  description?: string,
  file: any,
  createDate?: Date,
}
