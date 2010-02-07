<?php

require_once 'phing/Task.php';

class combineCssTask extends Task {
    protected $source;
    
    protected $target;
    
    public function setTarget($target) {
        $this->target = $target;
    }
    
    public function setSource($source) {
        $this->source = $source;
    }
    
    public function init() {
        return true;
    }
    
    public function main() {
        // the pattern matches any line that:
        //  - starts with @import
        //  - is optionally followed by the string url
        //  - followed by an optional left parenthesis
        //  - followed by a css file path with .css extension, optionally wrapped in single or double quotes
        //  - and ends with an optional right parenthesis and semi-colon
        //  - examples (should all match):
        //   - @import url("path/to/file.css");
        //   - @import url "path/to/file.css";
        //   - @import "path/to/file.css";
        //   - @import path/to/file.css;
        $pattern = '/^@import (url)?(\()?(\'|")?([a-z-_\/]+\.css)(\'|")?(\))?;$/m';
        $matches = null;
        $source  = null;
        $css     = null;
        
        // get the source css file
        $source = file_get_contents($this->source);

        // include all files referenced with @import
        preg_match_all($pattern, $source, $matches);
        
        // for each file, paste the contents into target css file
        if ($matches) {
            foreach ($matches[4] as $match) {
                $this->log('Appending ' . $match . '...');
                // load file and paste contents into target file
                $css = file_get_contents(realpath(dirname($this->source)) . '/' . $match);
                
                if ($css) {
                    file_put_contents($this->target, $css, FILE_APPEND);
                }
            }
        }

        
    }
    
}

?>