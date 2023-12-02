import Quill from 'quill'
const Parchment = Quill.import('parchment')

class IndentAttributor extends Parchment.Attributor.Style {
    add(node, value) {
        if (value === 0) {
            this.remove(node)
            return true
        } else {
            return super.add(node, `${value}em`)
        }
    }
}

let IndentStyle = new IndentAttributor('indent', 'text-indent', {
    scope: Parchment.Scope.BLOCK,
    whitelist: ['1em', '2em', '3em', '4em', '5em', '6em', '7em', '8em', '9em']
})

export { IndentStyle }