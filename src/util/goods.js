import Mock from 'mockjs'


const goods = Mock.mock({
  "class|20": [
    {
      id:"@id()",
      name: "@cword(4, 8)",
      "goods|7-14": [
        {
          title: "麻辣鸡排麻辣鸡排麻辣鸡排麻辣鸡排麻辣鸡排麻辣鸡排麻辣鸡排",
          price: '@integer(2, 10)',
          id:"@id()",
        }
      ]
    }
  ]
})

export default goods