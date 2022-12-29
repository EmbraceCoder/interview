import {matchBracket} from "./match-bracket";


describe("括号匹配", () => {
  it("正常情况 {([])}", () => {
    const str = "{([])}"
    const res = matchBracket(str)
    expect(res).toBeTruthy()
  })
  it("不匹配情况 {([)}", () => {
    const str = "{([)}"
    const res = matchBracket(str)
    expect(res).toBeFalsy()
  })

  it("单括号情况 {", () => {
    const str = "{"
    const res = matchBracket(str)
    expect(res).toBeFalsy()
  })
  it("单括号情况 }", () => {
    const str = "}"
    const res = matchBracket(str)
    expect(res).toBeFalsy()
  })
  it("单括号情况 [", () => {
    const str = "["
    const res = matchBracket(str)
    expect(res).toBeFalsy()
  })
  it("单括号情况 ]", () => {
    const str = "]"
    const res = matchBracket(str)
    expect(res).toBeFalsy()
  })
  it("单括号情况 (", () => {
    const str = "("
    const res = matchBracket(str)
    expect(res).toBeFalsy()
  })
  it("单括号情况 )", () => {
    const str = ")"
    const res = matchBracket(str)
    expect(res).toBeFalsy()
  })
})



