declare module chai{
    export function should(target: any, message?: string): Should;
    export function should(): Should;

interface Should extends chai.LanguageChains, chai.NumericComparison, chai.TypeComparison, chai.Assertions {
    not: chai.Expect;
    deep: chai.Deep;
    a: chai.TypeComparison;
    an: chai.TypeComparison;
    include: chai.Include;
    contain: chai.Include;
    ok: chai.Expect;
    true: chai.Expect;
    false: chai.Expect;
    null: chai.Expect;
    undefined: chai.Expect;
    exist: chai.Expect;
    empty: chai.Expect;
    arguments: chai.Expect;
    Arguments: chai.Expect;
    equal: chai.Equal;
    equals: chai.Equal;
    eq: chai.Equal;
    eql: chai.Equal;
    eqls: chai.Equal;
    property: chai.Property;
    ownProperty: chai.OwnProperty;
    haveOwnProperty: chai.OwnProperty;
    length: chai.Length;
    lengthOf: chai.Length;
    match(RegularExpression: RegExp, message?: string): chai.Expect;
    string(string: string, message?: string): chai.Expect;
    keys: chai.Keys;
    key(string: string): chai.Expect;
    throw: chai.Throw;
    throws: chai.Throw;
    Throw: chai.Throw;
    respondTo(method: string, message?: string): chai.Expect;
    itself: chai.Expect;
    satisfy(matcher: Function, message?: string): chai.Expect;
    closeTo(expected: number, delta: number, message?: string): chai.Expect;
    members: chai.Members;
    }
}