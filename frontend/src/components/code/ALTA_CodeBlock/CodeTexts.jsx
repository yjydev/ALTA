export default {
  bash: `echo Hello World`,
  c: `int main(void)
{
  puts("Hello World!");
  return EXIT_SUCCESS;
}
`,
  cpp: `#include <iostream.h>
main() {
  cout << "Hello World!" << endl;
  return 0;
}`,
  go: `package main
import "fmt"
func main() {
  fmt.Printf("Hello World\n")
}
`,
  html: `<html>
<!-- Hello World in HTML -->
<head>
<title>Hello World!</title>
</head>
<body>
Hello World!
</body>
</html>
`,
  java: `class HelloWorld {
  static public void main( String args[] ) {
    System.out.println( "Hello World!" );
  }
}`,
  javascript: `var sys = require("sys");
sys.puts("Hello World");
`,
  jsx: `class HelloMessage extends React.Component {
  handlePress = () => {
    alert('Hello')
  }
  render() {
    return (
      <div>
        <p>Hello {this.props.name}</p>
        <button onClick={this.handlePress}>Say Hello</button>
      </div>
    );
  }
  test
  test
  test
  test
  etst
  stes
  sss
  sss
  sssss
}

ReactDOM.render(
  <HelloMessage name="Taylor" />, 
  mountNode 
);`,
  kotlin: `fun main(args : Array<String>) {
  println("Hello, world!")
}
`,
  python: `# Hello world in Python 2
print "Hello World"

# Hello world in Python 3 (aka Python 3000)
print("Hello World")
`,
  r: `cat("Hello world\n")`,
  ruby: `puts "Hello World!"`,
  rust: `fn main() {
  println!("Hello World!");
}
`,
  scala: `object HelloWorld extends App {
  println("Hello world!")
}
`,
  sql: `SELECT "Hello World";`,
  swift: `println("Hello, world!")`,
  tsx: `import * as React from "react";

export class HelloWorld extends React.Component<any, any> {
    render() {
        return <div>Hello world!It's from Helloword Component.</div>;
    }
}`,
  typescript: `var exclamation: string = "Hello";
var noun: string = "World";
console.log(exclamation + noun);
`,
};
