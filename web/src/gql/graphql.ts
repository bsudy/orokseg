/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Child = {
  __typename?: 'Child';
  fatherRelationType?: Maybe<ChildRelationType>;
  handle: Scalars['String']['output'];
  motherRelationType?: Maybe<ChildRelationType>;
  person?: Maybe<Person>;
  privacy?: Maybe<Scalars['Boolean']['output']>;
};

export enum ChildRelationType {
  Adopted = 'ADOPTED',
  Birth = 'BIRTH',
  Custom = 'CUSTOM',
  Foster = 'FOSTER',
  None = 'NONE',
  Sponsored = 'SPONSORED',
  Stepchild = 'STEPCHILD',
  Unknown = 'UNKNOWN'
}

export type Family = {
  __typename?: 'Family';
  children?: Maybe<Array<Maybe<Child>>>;
  father?: Maybe<Person>;
  grampsId: Scalars['ID']['output'];
  handle: Scalars['String']['output'];
  mother?: Maybe<Person>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

export type Name = {
  __typename?: 'Name';
  displayName: Scalars['String']['output'];
  givenName?: Maybe<Scalars['String']['output']>;
  suffix?: Maybe<Scalars['String']['output']>;
  surnames?: Maybe<Array<Maybe<Surname>>>;
};

export type Note = {
  __typename?: 'Note';
  change: Scalars['Int']['output'];
  format: NoteFormat;
  grampsId: Scalars['ID']['output'];
  handle: Scalars['String']['output'];
  privacy: Scalars['Boolean']['output'];
  text: StyledText;
  type: NoteType;
};

export enum NoteFormat {
  Flowed = 'FLOWED',
  Formatted = 'FORMATTED'
}

export type NoteType = {
  __typename?: 'NoteType';
  type: NoteTypeEnum;
  value?: Maybe<Scalars['String']['output']>;
};

export enum NoteTypeEnum {
  Address = 'ADDRESS',
  Analysis = 'ANALYSIS',
  Association = 'ASSOCIATION',
  Attribute = 'ATTRIBUTE',
  Childref = 'CHILDREF',
  Citation = 'CITATION',
  Custom = 'CUSTOM',
  Event = 'EVENT',
  Eventref = 'EVENTREF',
  Family = 'FAMILY',
  General = 'GENERAL',
  HtmlCode = 'HTML_CODE',
  Lds = 'LDS',
  Link = 'LINK',
  Media = 'MEDIA',
  Mediaref = 'MEDIAREF',
  Person = 'PERSON',
  Personname = 'PERSONNAME',
  Place = 'PLACE',
  Repo = 'REPO',
  Reporef = 'REPOREF',
  ReportText = 'REPORT_TEXT',
  Research = 'RESEARCH',
  Source = 'SOURCE',
  Sourceref = 'SOURCEREF',
  SourceText = 'SOURCE_TEXT',
  Todo = 'TODO',
  Transcript = 'TRANSCRIPT',
  Unknown = 'UNKNOWN'
}

export type Person = {
  __typename?: 'Person';
  displayName: Scalars['String']['output'];
  families?: Maybe<Array<Maybe<Family>>>;
  gender?: Maybe<Gender>;
  grampsId?: Maybe<Scalars['ID']['output']>;
  handle?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Name>;
  names?: Maybe<Array<Maybe<Name>>>;
  notes?: Maybe<Array<Maybe<Note>>>;
  parentFamilies?: Maybe<Array<Maybe<Family>>>;
};

export type PersonList = {
  __typename?: 'PersonList';
  hasMore?: Maybe<Scalars['Boolean']['output']>;
  persons: Array<Person>;
};

export type Query = {
  __typename?: 'Query';
  familyById?: Maybe<Family>;
  noteById?: Maybe<Note>;
  personById?: Maybe<Person>;
  persons?: Maybe<PersonList>;
};


export type QueryFamilyByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNoteByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPersonByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPersonsArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};

export type StyledText = {
  __typename?: 'StyledText';
  tags: Array<StyledTextTag>;
  text: Scalars['String']['output'];
};

export type StyledTextRange = {
  __typename?: 'StyledTextRange';
  end: Scalars['Int']['output'];
  start: Scalars['Int']['output'];
};

export type StyledTextTag = {
  __typename?: 'StyledTextTag';
  name: Scalars['String']['output'];
  ranges?: Maybe<Array<Maybe<StyledTextRange>>>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Surname = {
  __typename?: 'Surname';
  prefix?: Maybe<Scalars['String']['output']>;
  primary?: Maybe<Scalars['Boolean']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
};

export type PersonListQueryVariables = Exact<{ [key: string]: never; }>;


export type PersonListQuery = { __typename?: 'Query', persons?: { __typename?: 'PersonList', hasMore?: boolean | null, persons: Array<{ __typename?: 'Person', grampsId?: string | null, handle?: string | null, displayName: string }> } | null };


export const PersonListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"personList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"grampsId"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}}]}}]}}]} as unknown as DocumentNode<PersonListQuery, PersonListQueryVariables>;