let language_examples = [{
    'language': 'ruby',
    'code': `def fibonacci(number)\n    a = 0\n    b = 1\n    c = 0\n\n    i = 0\n    while i < number\n        c = a + b\n        b = a\n        a = c\n\n        print("#{i+1}: #{c}\\n")\n        i += 1\n    end\nend\n\nnum = Integer(ARGV[0]) rescue -1\nif num >= 0\n    fibonacci(num)\nelse\n    print("Usage: please input the count of fibonacci numbers to output")\nend`
},
{ 
    'language': 'javascript',
    'code': `const isPrime = (number) => {\n    if(number <= 1)\n        return false\n\n    for (let i = 2; i <= Math.sqrt(number); i++) {\n        if (number % i == 0) {\n            return false;\n        }\n    }\n    return number > 1;\n};\n\nconst input = process.argv[2];\nlet number = Number(input)\n\nif (input !== '' && Number.isInteger(number) && number >= 0) {\n    isPrime(input) ? console.log("prime") : console.log("composite");\n} else {\n    console.log("Usage: please input a non-negative integer")\n}`
},
{
    'language': 'go',
    'code': `package main\n\nimport (\n    "fmt"\n    "os"\n    "strconv"\n)\n\nfunc isPrime(n int) bool {\n    if n < 2 {\n        return false\n    } else {\n        for i := 2; i <= n/2; i++ {\n            if n%i == 0 {\n                return false\n            }\n        }\n    }\n    return true\n}\n\nfunc exitWithError() {\n    fmt.Println("Usage: please input a non-negative integer")\n    os.Exit(1)\n}\n\nfunc main() {\n    if len(os.Args) != 2 {\n        exitWithError()\n    }\n\n    n, err := strconv.Atoi(os.Args[1])\n    if err != nil || n < 0 {\n        exitWithError()\n    }\n\n    if isPrime(n) {\n        fmt.Println("Prime")\n    } else {\n        fmt.Println("Composite")\n    }\n}`
},
{
    'language': 'rust',
    'code': `use std::process;\nfn main() {\n    //confirm integer is passed as commandline argument\n    let mut input_value = std::env::args().nth(1).expect("please input a non-negative integer");\n    // Trim the trailing newline\n    input_value = input_value.trim_end().to_string();\n    //String to Int\n    let input_num: u128 = input_value\n        .trim()\n        .parse()\n        .expect("please input a non-negative integer");\n\n    let mut n = 3 as u128;\n    let divisor = input_num /2 as u128;\n\n    if input_num % 2 == 0 {\n        println!("Composite");\n        process::exit(1);\n    }    \n    while n < divisor {  \n        if input_num % n == 0 {\n        println!("Composite");\n        process::exit(1);        \n        }\n        n = n + 2;\n    }\n    if n >= divisor {\n    println!("Prime");\n    }\n}`
}]

language_examples.map((item) => {
    const mainContent = document.querySelector('.main .content');
    mainContent.innerHTML += `<div class="code-example" id="${item.language}" style="display: none">
        <pre>
            <code class="language-${item.language}">${item.code}</code>
        </pre>
    </div>`;  
});


const sidebarItem = document.querySelectorAll('.main .sidebar .sidebar-item')

for (var i = 0; i < sidebarItem.length; i++) {
    sidebarItem[i].addEventListener('click', langClicked);
}


// eventlistener clicked, activate when clicked
function langClicked() {
    // deactivate everything else
    const sidebarItem = document.querySelectorAll('.main .sidebar .sidebar-item')
    for (var i = 0; i < sidebarItem.length; i++) {
        sidebarItem[i].classList.remove('active');
    };

    this.classList.toggle('active');
    if (this.classList.contains('active')) {
        // show code
        const codeExample = document.querySelectorAll('.main .content .code-example')
        for (var i = 0; i < codeExample.length; i++) {
            codeExample[i].style.display = 'none';
        };
        document.querySelector(`.main .content .code-example#${this.id}`).style.display = 'block';
    }
}

hljs.highlightAll();
hljs.initLineNumbersOnLoad();

let styles = `
td.hljs-ln-numbers {
    color: #ffffff;
    opacity: 0.4;
    padding-right: 1rem;
    text-align: right;
}`
let styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)