// Type definitions for omise-node
// Project: https://github.com/omise/omise-node
// Definitions by: Bhoomtawath Plinsut <https://github.com/varshard>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import * as Bluebird from 'bluebird';

declare function Omise(options: Omise.IOptions): Omise.IOmise;

export = Omise;

declare namespace Omise {
  export interface IOptions {
    publicKey: string;
    secretKey: string;
  }

  export interface IOmise {
    accounts: Account.IAccountAPI;
    balances: Balance.IBalanceAPI;
    charges: Charges.IChargesAPI;
    customers: Customers.ICustomersAPI;
    disputes: Disputes.IDisputesAPI;
    events: Events.IEventsAPI;
    links: Links.ILinksAPI;
    recipients: Recipients.IRecipientsAPI;
    sources: Sources.ISourcesAPI;
    tokens: Tokens.ITokensAPI;
    transactions: Transactions.ITransactionsAPI;
    transfers: Transfers.ITransfersAPI;
  }

  export namespace Account {
    interface IAccountAPI {
      retrieve(callback?: ResponseCallback<IAccount>): Bluebird<IAccount>;
    }

    interface IAccount extends IBaseResponse {
      email: string;
      currency: string;
      supported_currencies: string[];
      created: string;
    }
  }

  export namespace Balance {
    interface IBalanceAPI {
      retrieve(callback?: ResponseCallback<IBalance>): Bluebird<IBalance>;
    }

    interface IBalance extends IBaseResponse {
      available: number;
      total: number;
      currency: string;
    }
  }

  export namespace Cards {
    interface ICard extends IBaseResponse {
      country: string;
      city: string;
      postal_code: string;
      financing: string;
      bank: string;
      last_digits: string;
      brand: string;
      expiration_month: number;
      expiration_year: number;
      fingerprint: string;
      name: string;
      security_code_check: boolean;
      created: string;
    }

    interface ICardRequest {
      name?: string;
      expiration_month?: number;
      expiration_year?: number;
      postal_code?: string;
      city?: string;
    }

    interface ICardList extends Pagination.IResponse {
      data: ICard[];
    }
  }

  export namespace Charges {
    interface IChargesAPI {
      create(req: IRequest, callback?: ResponseCallback<ICharge>): Bluebird<ICharge>;
      update(chargeID: string, req: IRequest, callback?: ResponseCallback<ICharge>): Bluebird<ICharge>;
      retrieve(chargeID: string, callback?: ResponseCallback<ICharge>): Bluebird<ICharge>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback<IChargeList>): Bluebird<IChargeList>;
      capture(chargeID: string, callback?: ResponseCallback<ICharge>): Bluebird<ICharge>;
      reverse(chargeID: string, callback?: ResponseCallback<ICharge>): Bluebird<ICharge>;
      createRefund(chargeID: string, callback?: ResponseCallback<IRefundResponse>): Bluebird<IRefundResponse>;
      listRefunds(chargeID: string, callback?: ResponseCallback<IListRefundResponse>): Bluebird<IListRefundResponse>;
      retrieveRefund(chargeID: string, refundID: string, callback?: ResponseCallback<IRefundResponse>): Bluebird<IRefundResponse>;
    }

    interface IRequest {
      description?: string;
      amount: number;
      currency: string;
      capture?: boolean;
      card?: string;
      customer?: string;
      return_uri?: string;
      metadata?: any;
      source?: string;
    }

    interface ICharge extends IBaseResponse {
      amount: number;
      currency: string;
      description: string;
      capture: boolean;
      authorized: boolean;
      reversed: boolean;
      paid: boolean;
      transaction: string;
      refunded: number;
      refunds: IListRefundResponse;
      failure_code: string;
      failure_message: string;
      card: Cards.ICard;
      customer: string;
      ip: string;
      dispute: string;
      created: string;
      metadata: {[key: string]: any};
      source?: Sources.ISource;
    }

    interface IListRefundResponse extends Pagination.IResponse {
      data: IRefundResponse[];
    }

    interface IChargeList extends Pagination.IResponse {
      data: ICharge[];
    }

    interface IRefundResponse extends IBaseResponse {
      amount: number;
      currency: string;
      charge: string;
      transaction: string;
      created: string;
      voided: boolean;
    }
  }

  export namespace Sources {
    interface ISourcesAPI {
      create(req: IRequest, callback?: ResponseCallback<ISource>): Bluebird<ISource>;
    }

    interface IRequest {
      type: string;
      amount: number;
      currency: string;
    }

    interface ISource extends IBaseResponse {
      type: string;
      flow: string;
      amount: number;
      currency: string;
    }
  }

  export namespace Customers {
    interface ICustomersAPI {
      create(req: IRequest, callback?: ResponseCallback<ICustomer>): Bluebird<ICustomer>;
      retrieve(customerID: string, callback?: ResponseCallback<ICustomer>): Bluebird<ICustomer>;
      update(customerID: string, req: IRequest, callback?: ResponseCallback<ICustomer>): Bluebird<ICustomer>;
      destroy(customerID: string, callback?: ResponseCallback<IDestroyResponse>): Bluebird<IDestroyResponse>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback<ICustomerList>): Bluebird<ICustomerList>;
      listCards(customerID: string, parameters?: Pagination.IRequest, callback?: ResponseCallback<Cards.ICardList>)
        : Bluebird<Cards.ICardList>;
      retrieveCard(customerID: string, cardID: string, callback?: ResponseCallback<Cards.ICard>): Bluebird<Cards.ICard>;
      updateCard(customerID: string, cardID: string, details: Cards.ICardRequest,
                 callback?: ResponseCallback<Cards.ICard>): Bluebird<Cards.ICard>;
      destroyCard(customerID: string, cardID: string, callback?: ResponseCallback<Cards.ICard>): Bluebird<Cards.ICard>;
    }

    interface IRequest {
      email?: string;
      description?: string;
      card?: string;
    }

    interface ICustomer extends IBaseResponse {
      default_card: string;
      email: string;
      description: string;
      created: string;
      cards: Cards.ICardList;
    }

    interface ICustomerList extends Pagination.IResponse {
      data: ICustomer[];
    }
  }

  export namespace Disputes {
    interface IDisputesAPI {
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback<IListResponse>): Bluebird<IListResponse>;
      listClosed(callback?: ResponseCallback<IListResponse>): Bluebird<IListResponse>;
      listOpen(callback?: ResponseCallback<IListResponse>): Bluebird<IListResponse>;
      listPending(callback?: ResponseCallback<IListResponse>): Bluebird<IListResponse>;
      retrieve(disputeID: string, callback?: ResponseCallback<IResponse>): Bluebird<IResponse>;
      update(disputeID: string, req: IRequest, callback?: ResponseCallback<IResponse>): Bluebird<IResponse>;
    }

    interface IRequest {
      message: string;
    }

    interface IResponse extends IBaseResponse {
      amount: number;
      charge: string;
      created: string;
      closed_at: string;
      currency: string;
      message: string;
      documents: IDocumentsList;
      reason_code: string;
      reason_message: string;
      status: string;
      transaction: string;
    }

    interface IListResponse extends Pagination.IResponse {
      data: IResponse[];
    }

    interface IDocument extends IBaseResponse {
      filename: string;
      created: string;
    }

    interface IDocumentsList extends Pagination.IResponse {
      data: IDocument[];
    }
  }

  export namespace Events {
    interface IEventsAPI {
      retrieve(eventID: string, callback?: ResponseCallback<IEvent>): Bluebird<IEvent>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback<IEventList>): Bluebird<IEventList>;
    }

    interface IEvent extends IBaseResponse {
      key: string;
      created: string;
      data: any;
    }

    interface IEventList extends Pagination.IResponse {
      data: IEvent[];
    }
  }

  export namespace Links {
    interface ILinksAPI {
      retrieve(linkID: string, callback?: ResponseCallback<ILink>): Bluebird<ILink>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback<ILinkListResponse>): Bluebird<ILinkListResponse>;
      create(req: IRequest, callback?: ResponseCallback<ILink>): Bluebird<ILink>;
    }

    interface IRequest {
      amount: number;
      currency: string;
      title: string;
      description: string;
      multiple?: boolean;
    }

    interface ILink extends IBaseResponse {
      amount: number;
      currency: string;
      used: boolean;
      multiple: boolean;
      title: string;
      description: string;
      charges: Charges.IChargeList;
      payment_uri: string;
      created: string;
    }

    interface ILinkListResponse extends Pagination.IResponse {
      data: ILink[];
    }
  }

  export namespace Recipients {
    interface IRecipientsAPI {
      create(req: IRequest, callback?: ResponseCallback<IRecipient>): Bluebird<IRecipient>;
      update(recipientID: string, req: IRequest, callback?: ResponseCallback<IRecipient>): Bluebird<IRecipient>;
      retrieve(recipientID: string, callback?: ResponseCallback<IRecipient>): Bluebird<IRecipient>;
      destroy(recipientID: string, callback?: ResponseCallback<IDestroyResponse>): Bluebird<IDestroyResponse>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback<IRecipientList>): Bluebird<IRecipientList>;
    }

    interface IRequest {
      name: string;
      email?: string;
      description?: string;
      type: string;
      tax_id?: string;
      back_account: IBankAccount;
    }

    interface IRecipient extends IBaseResponse {
      verified: boolean;
      active: boolean;
      name: string;
      email: string;
      description: string;
      type: string;
      tax_id: string;
      bank_account: IBankAccount;
      failure_code: string;
      created: string;
    }

    interface IRecipientList extends Pagination.IResponse {
      data: IRecipient[];
    }
  }

  export namespace Transactions {
    interface ITransactionsAPI {
      retrieve(transactionID: string, callback?: ResponseCallback<ITransaction>): Bluebird<ITransaction>;
      list(parameters?: Pagination.IRequest, callback?: ResponseCallback<ITransactionList>): Bluebird<ITransactionList>;
    }

    interface ITransaction extends IBaseResponse {
      type: string;
      amount: number;
      currency: string;
      transferable: string;
      created: string;
    }

    interface ITransactionList extends Pagination.IResponse {
      data: ITransaction[];
    }
  }

  export namespace Transfers {
    interface ITransfersAPI {
      create(req: IRequest, callback?: ResponseCallback<ITransfer>): Bluebird<ITransfer>;
      update(transferID: string, req: IRequest, callback?: ResponseCallback<ITransfer>): Bluebird<ITransfer>;
      retrieve(transferID: string, callback?: ResponseCallback<ITransfer>): Bluebird<ITransfer>;
      destroy(transferID: string, callback?: ResponseCallback<IDestroyResponse>): Bluebird<IDestroyResponse>;
      list(parameters: Pagination.IRequest, callback?: ResponseCallback<ITransferList>): Bluebird<ITransferList>;
    }

    interface IRequest {
      amount: number;
      recipient?: string;
      fail_fast?: boolean;
    }

    interface ITransfer extends IBaseResponse {
      recipient: string;
      bank_account: IBankAccount;
      sent: boolean;
      paid: boolean;
      amount: number;
      currency: string;
      fee: number;
      fail_fast: boolean;
      failure_code: boolean;
      failure_message: string;
      transaction: string;
      created: string;
    }

    interface ITransferList extends Pagination.IResponse {
      data: ITransfer[];
    }
  }

  export namespace Tokens {
    interface ITokensAPI {
      create(options: IRequest, callback?: ResponseCallback<IToken>): Bluebird<IToken>;
      retrieve(tokenID: string, callback?: ResponseCallback<IToken>): Bluebird<IToken>;
    }

    interface IRequest {
      card: ICard;
    }

    interface ICard {
      name: string;
      city: string;
      postal_code: number|string;
      number: string;
      security_code: string;
      expiration_month: number|string;
      expiration_year: number|string;
    }

    interface IToken extends IBaseResponse {
      used: boolean;
      card: Cards.ICard;
      created: string;
    }
  }

  export namespace Pagination {
    interface IRequest {
      offset?: number;
      limit?: number;
      from?: string;
      to?: string;
      order?: string;
      total?: number;
    }

    interface IResponse {
      object: string;
      offset: number;
      limit: number;
      from: string;
      to: string;
      order: string;
      total: number;
      data: any[];
      location?: string;
    }
  }

  interface IBankAccount {
    object: string;
    brand: string;
    last_digits: string;
    name: string;
    created: string;
  }

  interface IBaseResponse {
    object: string;
    id: string;
    livemode?: boolean;
    location?: string;
  }

  interface IDestroyResponse extends IBaseResponse {
    deleted: boolean;
  }

  type ResponseCallback<R> = (err: any, resp: R) => void;
}
