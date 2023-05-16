import Mock from 'mockjs'


const goods = Mock.mock({
  "class|20": [
    {
      id:"@id()",
      name: "@cword(4, 8)",
      "goods|4-8": [
        {
          title: "麻辣鸡排麻辣鸡排麻辣鸡排麻辣鸡排麻辣鸡排麻辣鸡排麻辣鸡排",
          price: '@integer(2, 18)',
          id:"@id()",
          count: 0
        }
      ]
    }
  ]
})

export default goods