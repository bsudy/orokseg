/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment NameFields on Name {\n    givenName\n    displayName\n    suffix\n    surnames {\n      surname\n      prefix\n      primary\n    }\n  }\n": types.NameFieldsFragmentDoc,
    "\n  fragment AttributeFields on Attribute {\n    type\n    customType\n    value\n  }\n": types.AttributeFieldsFragmentDoc,
    "\n  fragment MediumRefFields on MediumRef {\n    handle\n    rectangle {\n      x1\n      y1\n      x2\n      y2\n    }\n    medium {\n      handle\n      grampsId\n      mime\n      description\n      contentUrl\n      tags\n    }\n  }\n": types.MediumRefFieldsFragmentDoc,
    "\n  \n  \n  \n  fragment PersonFields on Person {\n    grampsId\n    handle\n    displayName\n    gender\n    name {\n      ...NameFields\n    }\n    mediumRefs {\n      ...MediumRefFields\n    }\n    attributes {\n      ...AttributeFields\n    }\n  }\n": types.PersonFieldsFragmentDoc,
    "\n  \n  query personList {\n    persons {\n      persons {\n        ...PersonFields\n      }\n      hasMore\n    }\n  }\n": types.PersonListDocument,
    "\n  \n  query person($grampsId: ID!) {\n    personById(id: $grampsId) {\n      ...PersonFields\n\n      notes {\n        handle\n        grampsId\n        change\n        format\n        privacy\n        type {\n          type\n          value\n        }\n        text {\n          text\n          tags {\n            name\n            value\n            ranges {\n              start\n              end\n            }\n          }\n        }\n      }\n      parentFamilies {\n        grampsId\n        handle\n        father {\n          ...PersonFields\n        }\n        mother {\n          ...PersonFields\n        }\n      }\n      families {\n        grampsId\n        handle\n        children {\n          handle\n          motherRelationType\n          fatherRelationType\n          privacy\n          person {\n            ...PersonFields\n            families {\n              grampsId\n              handle\n              children {\n                handle\n                person {\n                  ...PersonFields\n                }\n              }\n            }\n          }\n        }\n        father {\n          ...PersonFields\n          parentFamilies {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n        mother {\n          ...PersonFields\n          parentFamilies {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n      }\n    }\n  }\n": types.PersonDocument,
    "\n  \n  \n  query family($grampsId: ID!) {\n    familyById(id: $grampsId) {\n      grampsId\n      handle\n      children {\n        handle\n        motherRelationType\n        fatherRelationType\n        privacy\n        person {\n          ...PersonFields\n          families {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n      }\n      mediumRefs {\n        ...MediumRefFields\n      }\n      # Should we go sides with other partners?\n      father {\n        ...PersonFields\n        parentFamilies {\n          grampsId\n          handle\n          father {\n            ...PersonFields\n          }\n          mother {\n            ...PersonFields\n          }\n        }\n      }\n      # Should we go sides with other partners?\n      mother {\n        ...PersonFields\n        parentFamilies {\n          grampsId\n          handle\n          father {\n            ...PersonFields\n          }\n          mother {\n            ...PersonFields\n          }\n        }\n      }\n    }\n  }\n": types.FamilyDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment NameFields on Name {\n    givenName\n    displayName\n    suffix\n    surnames {\n      surname\n      prefix\n      primary\n    }\n  }\n"): (typeof documents)["\n  fragment NameFields on Name {\n    givenName\n    displayName\n    suffix\n    surnames {\n      surname\n      prefix\n      primary\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AttributeFields on Attribute {\n    type\n    customType\n    value\n  }\n"): (typeof documents)["\n  fragment AttributeFields on Attribute {\n    type\n    customType\n    value\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MediumRefFields on MediumRef {\n    handle\n    rectangle {\n      x1\n      y1\n      x2\n      y2\n    }\n    medium {\n      handle\n      grampsId\n      mime\n      description\n      contentUrl\n      tags\n    }\n  }\n"): (typeof documents)["\n  fragment MediumRefFields on MediumRef {\n    handle\n    rectangle {\n      x1\n      y1\n      x2\n      y2\n    }\n    medium {\n      handle\n      grampsId\n      mime\n      description\n      contentUrl\n      tags\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  \n  \n  fragment PersonFields on Person {\n    grampsId\n    handle\n    displayName\n    gender\n    name {\n      ...NameFields\n    }\n    mediumRefs {\n      ...MediumRefFields\n    }\n    attributes {\n      ...AttributeFields\n    }\n  }\n"): (typeof documents)["\n  \n  \n  \n  fragment PersonFields on Person {\n    grampsId\n    handle\n    displayName\n    gender\n    name {\n      ...NameFields\n    }\n    mediumRefs {\n      ...MediumRefFields\n    }\n    attributes {\n      ...AttributeFields\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  query personList {\n    persons {\n      persons {\n        ...PersonFields\n      }\n      hasMore\n    }\n  }\n"): (typeof documents)["\n  \n  query personList {\n    persons {\n      persons {\n        ...PersonFields\n      }\n      hasMore\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  query person($grampsId: ID!) {\n    personById(id: $grampsId) {\n      ...PersonFields\n\n      notes {\n        handle\n        grampsId\n        change\n        format\n        privacy\n        type {\n          type\n          value\n        }\n        text {\n          text\n          tags {\n            name\n            value\n            ranges {\n              start\n              end\n            }\n          }\n        }\n      }\n      parentFamilies {\n        grampsId\n        handle\n        father {\n          ...PersonFields\n        }\n        mother {\n          ...PersonFields\n        }\n      }\n      families {\n        grampsId\n        handle\n        children {\n          handle\n          motherRelationType\n          fatherRelationType\n          privacy\n          person {\n            ...PersonFields\n            families {\n              grampsId\n              handle\n              children {\n                handle\n                person {\n                  ...PersonFields\n                }\n              }\n            }\n          }\n        }\n        father {\n          ...PersonFields\n          parentFamilies {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n        mother {\n          ...PersonFields\n          parentFamilies {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  query person($grampsId: ID!) {\n    personById(id: $grampsId) {\n      ...PersonFields\n\n      notes {\n        handle\n        grampsId\n        change\n        format\n        privacy\n        type {\n          type\n          value\n        }\n        text {\n          text\n          tags {\n            name\n            value\n            ranges {\n              start\n              end\n            }\n          }\n        }\n      }\n      parentFamilies {\n        grampsId\n        handle\n        father {\n          ...PersonFields\n        }\n        mother {\n          ...PersonFields\n        }\n      }\n      families {\n        grampsId\n        handle\n        children {\n          handle\n          motherRelationType\n          fatherRelationType\n          privacy\n          person {\n            ...PersonFields\n            families {\n              grampsId\n              handle\n              children {\n                handle\n                person {\n                  ...PersonFields\n                }\n              }\n            }\n          }\n        }\n        father {\n          ...PersonFields\n          parentFamilies {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n        mother {\n          ...PersonFields\n          parentFamilies {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  \n  \n  query family($grampsId: ID!) {\n    familyById(id: $grampsId) {\n      grampsId\n      handle\n      children {\n        handle\n        motherRelationType\n        fatherRelationType\n        privacy\n        person {\n          ...PersonFields\n          families {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n      }\n      mediumRefs {\n        ...MediumRefFields\n      }\n      # Should we go sides with other partners?\n      father {\n        ...PersonFields\n        parentFamilies {\n          grampsId\n          handle\n          father {\n            ...PersonFields\n          }\n          mother {\n            ...PersonFields\n          }\n        }\n      }\n      # Should we go sides with other partners?\n      mother {\n        ...PersonFields\n        parentFamilies {\n          grampsId\n          handle\n          father {\n            ...PersonFields\n          }\n          mother {\n            ...PersonFields\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  \n  query family($grampsId: ID!) {\n    familyById(id: $grampsId) {\n      grampsId\n      handle\n      children {\n        handle\n        motherRelationType\n        fatherRelationType\n        privacy\n        person {\n          ...PersonFields\n          families {\n            grampsId\n            handle\n            father {\n              ...PersonFields\n            }\n            mother {\n              ...PersonFields\n            }\n          }\n        }\n      }\n      mediumRefs {\n        ...MediumRefFields\n      }\n      # Should we go sides with other partners?\n      father {\n        ...PersonFields\n        parentFamilies {\n          grampsId\n          handle\n          father {\n            ...PersonFields\n          }\n          mother {\n            ...PersonFields\n          }\n        }\n      }\n      # Should we go sides with other partners?\n      mother {\n        ...PersonFields\n        parentFamilies {\n          grampsId\n          handle\n          father {\n            ...PersonFields\n          }\n          mother {\n            ...PersonFields\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;